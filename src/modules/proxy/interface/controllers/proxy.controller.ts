import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProxyDto } from '~modules/proxy/application/dto/create-proxy.dto';
import { CreateProxyUseCase } from '~modules/proxy/application/use-cases/create-proxy.use-case';
import { ProxyResponseDto } from '../dto/proxy-response.dto';
import { UpdateProxyDto } from '~modules/proxy/application/dto/update-proxy.dto';
import { UpdateProxyUseCase } from '~modules/proxy/application/use-cases/update-proxy.use-case';
import { DeleteProxyUseCase } from '~modules/proxy/application/use-cases/delete-proxy.use-case';
import { PagedResultDto } from '~shared/common/dto/paged-result.dto';
import {
  ProxySortKey,
  PagingQueryDto,
  SortDirection,
} from '~shared/common/dto/paging-query.dto';
import { ListProxiesUseCase } from '~modules/proxy/application/use-cases/list-proxies.use-case';
import { JwtAuthGuard } from '~shared/common/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'proxies',
  version: '1',
})
export class ProxyController {
  constructor(
    private readonly createUseCase: CreateProxyUseCase,
    private readonly updateUseCase: UpdateProxyUseCase,
    private readonly deleteUseCase: DeleteProxyUseCase,
    private readonly listUseCase: ListProxiesUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProxyDto): Promise<ProxyResponseDto> {
    return this.createUseCase.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProxyDto,
  ): Promise<{ success: boolean }> {
    const success = await this.updateUseCase.execute(id, dto);
    return { success };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(id);
  }

  @Get()
  async list(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortKey') sortKey?: ProxySortKey,
    @Query('orderBy') orderBy?: SortDirection,
    @Query('search') search?: string,
  ): Promise<PagedResultDto<ProxyResponseDto>> {
    const paging = new PagingQueryDto(+page, +limit, sortKey, orderBy, search);
    return this.listUseCase.execute(paging);
  }
}
