import { Injectable } from '@nestjs/common';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';
import { Conflict } from '~shared/common/exceptions/conflict.exception';

import { CreateVendorDto } from '../dto/create-vendor.dto';

@Injectable()
export class CreateVendorUseCase {
    constructor(private readonly vendorRepo: IVendorRepository) { }

    async execute(dto: CreateVendorDto): Promise<Vendor> {
        const existedVendor = await this.vendorRepo.findByName(dto.name);
        if (existedVendor) {
            throw new Conflict();
        }

        const vendor = Vendor.create(dto.name)
        return this.vendorRepo.save(vendor);
    }
}
