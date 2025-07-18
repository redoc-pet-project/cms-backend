import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '~modules/user/domain/entities/user.entity';
import { IUserRepository } from '~modules/user/domain/repositories/user.repository';

import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
    private logger: Logger,
  ) {}
  async findByUserId(userId: string): Promise<User | null> {
    try {
      const data = await this.repo.findOneBy({
        id: userId,
      });
      if (data) return this.toDomain(data);

      return null;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  async save(user: User): Promise<User> {
    const orm = this.repo.create(user);
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const data = await this.repo
        .createQueryBuilder('user')
        .where('LOWER(user.username) = LOWER(:username)', { username })
        .getOne();
      if (data) return this.toDomain(data);

      return null;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  private toDomain(user: UserOrmEntity): User {
    return new User(
      user.id,
      user.username,
      user.password,
      user.displayName,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }
}
