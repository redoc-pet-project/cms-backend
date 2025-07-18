import { Injectable } from '@nestjs/common';
import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';
import { IVendorRepository } from '~modules/vendor/domain/repositories/vendor.repository';
import { VendorResponseDto } from '~modules/vendor/interface/dto/vendor-response.dto';

@Injectable()
export class ListVendorsUseCase {
  constructor(private readonly vendorRepo: IVendorRepository) {}

  async execute(): Promise<VendorResponseDto[]> {
    const vendors = await this.vendorRepo.findAll();

    return vendors.map((v) => VendorResponseDto.fromDomain(v));
  }
}
