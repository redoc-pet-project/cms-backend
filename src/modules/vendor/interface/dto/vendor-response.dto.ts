import { Vendor } from '~modules/vendor/domain/entities/vendor.entity';

export class VendorResponseDto {
  id: string;
  name: string;

  static fromDomain(entity: Vendor): VendorResponseDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
