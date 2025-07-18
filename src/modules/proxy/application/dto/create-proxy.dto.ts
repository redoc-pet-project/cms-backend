import { ProxyType } from '~modules/proxy/domain/enums/proxy.enum';

export class CreateProxyDto {
  ip: string;
  port: number;
  type: ProxyType;
  country: string;
  description: string | null;
  vendorId: string;
  categoryIds: string[];
}
