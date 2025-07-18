import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { IProxyRepository } from '~modules/proxy/domain/repositories/proxy.repository';
import { Proxy } from '~modules/proxy/domain/entities/proxy.entity';
import { ProxyOrmEntity } from '~modules/proxy/infrastructure/entities/proxy.orm-entity';
import { ProxyCategoriesOrmEntity } from '~modules/proxy/infrastructure/entities/proxy-categories.orm-entity';
import { CategoryOrmEntity } from '~modules/category/infrastructure/entities/category.orm-entity';
import { BadRequest } from '~shared/common/exceptions/bad-request.exception';
import { NotFound } from '~shared/common/exceptions/not-found.exception';
import { VendorOrmEntity } from '~modules/vendor/infrastructure/entities/vendor.orm-entity';
import { PagingQueryDto } from '~shared/common/dto/paging-query.dto';
import { ProxyResponseDto } from '~modules/proxy/interface/dto/proxy-response.dto';

@Injectable()
export class ProxyRepositoryImpl implements IProxyRepository {
  constructor(
    @InjectRepository(ProxyOrmEntity)
    private readonly ormRepo: Repository<ProxyOrmEntity>,

    private readonly dataSource: DataSource,
    private readonly logger: Logger,
  ) {}
  async findPagedAndFiltered(
    paging: PagingQueryDto,
  ): Promise<[ProxyResponseDto[], number]> {
    try {
      const query = this.ormRepo.createQueryBuilder('proxy');

      if (paging.search) {
        query.andWhere(
          '(LOWER(proxy.ip) LIKE :search OR LOWER(proxy.type) LIKE :search OR LOWER(proxy.country) LIKE :search)',
          { search: `%${paging.search.toLowerCase()}%` },
        );
      }

      if (paging.sortKey) {
        query.orderBy(`proxy.${paging.sortKey}`, paging.orderBy ?? 'DESC');
      } else {
        query.orderBy('proxy.createdAt', 'DESC');
      }

      query.skip(paging.offset).take(paging.limit);
      query
        .leftJoinAndSelect('proxy.proxyCategories', 'proxyCategories')
        .leftJoinAndSelect('proxyCategories.category', 'category')
        .leftJoinAndSelect('proxy.vendor', 'vendor');
      const [rows, count] = await query.getManyAndCount();
      return [rows.map((row) => ProxyResponseDto.fromEntity(row)), count];
    } catch (err) {
      this.logger.error(err, 'err');
      throw err;
    }
  }

  async save(domain: Proxy): Promise<Proxy> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orm = this.toOrmEntity(domain);
      const saved = await queryRunner.manager.save(ProxyOrmEntity, orm);

      if (domain.categoryIds?.length > 0) {
        const categories = await queryRunner.manager.find(CategoryOrmEntity, {
          where: { id: In(domain.categoryIds) },
        });

        if (domain.categoryIds.length !== categories.length) {
          throw new NotFound('Category not found');
        }

        const proxyCategories = categories.map((category) =>
          queryRunner.manager.create(ProxyCategoriesOrmEntity, {
            proxyId: saved.id,
            categoryId: category.id,
          }),
        );

        await queryRunner.manager.save(
          ProxyCategoriesOrmEntity,
          proxyCategories,
        );
        saved.proxyCategories = proxyCategories;
      } else {
        saved.proxyCategories = [];
      }

      const vendor = await queryRunner.manager.findOne(VendorOrmEntity, {
        where: {
          id: domain.vendorId,
        },
      });

      if (!vendor) {
        throw new NotFound('Vendor not found');
      }

      await queryRunner.commitTransaction();
      return this.toDomainEntity(saved);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof NotFound) {
        throw err;
      }
      throw new BadRequest();
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, domain: Proxy): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        ProxyOrmEntity,
        id,
        this.toOrmEntity(domain),
      );

      // Remove existing category links
      await queryRunner.manager.delete(ProxyCategoriesOrmEntity, {
        proxyId: id,
      });

      if (domain.categoryIds?.length > 0) {
        const categories = await queryRunner.manager.find(CategoryOrmEntity, {
          where: { id: In(domain.categoryIds) },
        });

        if (categories.length !== domain.categoryIds.length) {
          throw new NotFound('Category not found');
        }

        const proxyCategories = categories.map((category) =>
          queryRunner.manager.create(ProxyCategoriesOrmEntity, {
            proxyId: id,
            categoryId: category.id,
          }),
        );

        await queryRunner.manager.save(
          ProxyCategoriesOrmEntity,
          proxyCategories,
        );
      }

      if (domain.vendorId) {
        const vendor = await queryRunner.manager.findOne(VendorOrmEntity, {
          where: {
            id: domain.vendorId,
          },
        });

        if (!vendor) {
          throw new NotFound('Vendor not found');
        }
      }

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: string): Promise<Proxy | null> {
    const orm = await this.ormRepo.findOne({ where: { id } });
    return orm ? this.toDomainEntity(orm) : null;
  }

  async findAll(): Promise<Proxy[]> {
    const entities = await this.ormRepo.find();
    return entities.map((e) => this.toDomainEntity(e));
  }

  async softDelete(id: string): Promise<void> {
    await this.ormRepo.softDelete(id);
  }

  // ---------------------------
  // Mapping Helpers
  // ---------------------------

  private toOrmEntity(domain: Proxy): ProxyOrmEntity {
    const orm = new ProxyOrmEntity();
    orm.id = domain.id;
    orm.ip = domain.ip;
    orm.port = domain.port;
    orm.type = domain.type;
    orm.country = domain.country;
    orm.status = domain.status;
    orm.description = domain.description ?? null;
    orm.vendorId = domain.vendorId;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt ?? null;
    return orm;
  }

  private toDomainEntity(orm: ProxyOrmEntity): Proxy {
    return new Proxy(
      orm.id,
      orm.ip,
      orm.port,
      orm.type,
      orm.country,
      orm.status,
      orm.description,
      orm.vendorId,
      orm.proxyCategories?.map((pC) => pC.categoryId) || [],
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}
