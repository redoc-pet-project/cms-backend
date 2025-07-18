import { Injectable } from '@nestjs/common';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';
import { VendorResponseDto } from '~modules/vendor/interface/dto/vendor-response.dto';
import { NotFound } from '~shared/common/exceptions/not-found.exception';

@Injectable()
export class UpdateVendorUseCase {
  constructor(private readonly vendorRepo: IVendorRepository) {}

  async execute(id: string, name: string): Promise<boolean> {
    const vendor = await this.vendorRepo.findById(id);
    if (!vendor) throw new NotFound();

    return this.vendorRepo.update(id, vendor.updateName(name));
  }
}
