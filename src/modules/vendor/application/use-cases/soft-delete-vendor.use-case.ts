import { Injectable } from '@nestjs/common';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';
import { NotFound } from '~shared/common/exceptions/not-found.exception';

@Injectable()
export class SoftDeleteVendorUseCase {
  constructor(private readonly vendorRepo: IVendorRepository) {}

  async execute(id: string): Promise<void> {
    const vendor = await this.vendorRepo.findById(id);
    if (!vendor) throw new NotFound();

    await this.vendorRepo.softDelete(id);
  }
}
