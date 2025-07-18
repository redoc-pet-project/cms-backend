import { Vendor } from '../entities/vendor.entity';

export abstract class IVendorRepository {
  abstract save(vendor: Vendor): Promise<Vendor>;
  abstract findById(id: string): Promise<Vendor | null>;
  abstract findAll(): Promise<Vendor[]>;
  abstract softDelete(id: string): Promise<void>;
  abstract findByName(name: string): Promise<Vendor | null>;
  abstract update(id: string, vendor: Vendor): Promise<boolean>;
}
