import { NestedCategoryDto } from '~modules/category/application/dto/nested-category.dto';
import { Proxy } from '~modules/proxy/domain/entities/proxy.entity';
import { ProxyOrmEntity } from '~modules/proxy/infrastructure/entities/proxy.orm-entity';
import { VendorResponseDto } from '~modules/vendor/interface/dto/vendor-response.dto';

export class ProxyResponseDto extends Proxy {
  categories?: NestedCategoryDto[];
  vendor?: VendorResponseDto;

  static fromDomain(entity: Proxy): ProxyResponseDto {
    return {
      id: entity.id,
      ip: entity.ip,
      port: entity.port,
      type: entity.type,
      country: entity.country,
      status: entity.status,
      description: entity.description || '',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      vendorId: entity.vendorId,
      categoryIds: entity.categoryIds,
    };
  }

  static fromEntity(entity: ProxyOrmEntity): ProxyResponseDto {
    const dto = new ProxyResponseDto(
      entity.id,
      entity.ip,
      entity.port,
      entity.type,
      entity.country,
      entity.status,
      entity.description || '',
      entity.vendorId,
      [],
      entity.createdAt,
      entity.updatedAt,
    );
    dto.vendor = entity.vendor;
    dto.categories = entity.proxyCategories.map((cate) =>
      NestedCategoryDto.fromOrmEntity(cate.category),
    );

    return dto;
  }
}
