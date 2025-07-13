import { Injectable } from '@nestjs/common';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';
import { NotFound } from '~shared/common/exceptions/not-found.exception';

@Injectable()
export class UpdateVendorUseCase {
    constructor(private readonly vendorRepo: IVendorRepository) { }

    async execute(id: string, name: string): Promise<Vendor> {
        const vendor = await this.vendorRepo.findById(id);
        if (!vendor || vendor.deletedAt) throw new NotFound();

        const updated = vendor.updateName(name);
        return this.vendorRepo.save(updated);
    }
}
