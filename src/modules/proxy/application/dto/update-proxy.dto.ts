import { ProxyStatus, ProxyType } from '~modules/proxy/domain/enums/proxy.enum';

export class UpdateProxyDto {
  ip?: string;
  port?: number;
  type?: ProxyType;
  country?: string;
  description?: string;
  status?: ProxyStatus;
  vendorId?: string;
  categoryIds?: string[];
}
