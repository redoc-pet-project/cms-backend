import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateVendorDto } from '~modules/vendor/application/dto/create-vendor.dto';
import { CreateVendorUseCase } from '~modules/vendor/application/use-cases/create-vendor.use-case';
import { ListVendorsUseCase } from '~modules/vendor/application/use-cases/list-vendors.use-case';
import { SoftDeleteVendorUseCase } from '~modules/vendor/application/use-cases/soft-delete-vendor.use-case';
import { UpdateVendorUseCase } from '~modules/vendor/application/use-cases/update-vendor.use-case';

@Controller('vendors')
export class VendorController {
  constructor(
    private readonly createVendor: CreateVendorUseCase,
    private listVendorsUseCase: ListVendorsUseCase,
    private updateVendor: UpdateVendorUseCase,
    private softDeleteVendor: SoftDeleteVendorUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateVendorDto) {
    return this.createVendor.execute(dto);
  }

  @Get()
  async list() {
    return this.listVendorsUseCase.execute();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.updateVendor.execute(id, body.name);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.softDeleteVendor.execute(id);
  }
}
