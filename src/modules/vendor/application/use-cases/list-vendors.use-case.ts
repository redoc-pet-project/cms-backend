import { Injectable } from '@nestjs/common';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';

@Injectable()
export class ListVendorsUseCase {
    constructor(private readonly vendorRepo: IVendorRepository) { }

    async execute(): Promise<Vendor[]> {
        return this.vendorRepo.findAll();
    }
}
