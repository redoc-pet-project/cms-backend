import { Injectable } from '@nestjs/common';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';
import { Conflict } from '~shared/common/exceptions/conflict.exception';

import { CreateVendorDto } from '../dto/create-vendor.dto';
import { VendorResponseDto } from '~modules/vendor/interface/dto/vendor-response.dto';

@Injectable()
export class CreateVendorUseCase {
  constructor(private readonly vendorRepo: IVendorRepository) {}

  async execute(dto: CreateVendorDto): Promise<VendorResponseDto> {
    const existedVendor = await this.vendorRepo.findByName(dto.name);
    if (existedVendor) {
      throw new Conflict();
    }

    const vendor = Vendor.create(dto.name);
    const savedVendor = await this.vendorRepo.save(vendor);

    return VendorResponseDto.fromDomain(savedVendor);
  }
}
