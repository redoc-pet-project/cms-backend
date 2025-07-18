import { config } from 'dotenv';

config();
export class EnvConfig {
  static get<T = string>(key: string): T {
    return process.env[key] as T;
  }
}
