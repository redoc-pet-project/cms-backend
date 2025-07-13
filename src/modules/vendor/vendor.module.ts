import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListVendorsUseCase } from '~modules/vendor/application/use-cases/list-vendors.use-case';
import { SoftDeleteVendorUseCase } from '~modules/vendor/application/use-cases/soft-delete-vendor.use-case';
import { UpdateVendorUseCase } from '~modules/vendor/application/use-cases/update-vendor.use-case';
import { CreateVendorUseCase } from './application/use-cases/create-vendor.use-case';
import { IVendorRepository } from './domain/repositories/vendor.repository';
import { VendorOrmEntity } from './infrastructure/entities/vendor.orm-entity';
import { VendorRepositoryImpl } from './infrastructure/repositories/vendor.repository.impl';
import { VendorController } from './interface/controllers/vendor.controller';

@Module({
    imports: [TypeOrmModule.forFeature([VendorOrmEntity])],
    controllers: [VendorController],
    providers: [
        CreateVendorUseCase,
        ListVendorsUseCase,
        UpdateVendorUseCase,
        SoftDeleteVendorUseCase,
        { provide: IVendorRepository, useClass: VendorRepositoryImpl },
    ],
    exports: [IVendorRepository],
})
export class VendorModule { }
