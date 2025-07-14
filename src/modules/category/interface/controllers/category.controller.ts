import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from '~modules/category/application/dto/create-category.dto';
import { UpdateCategoryDto } from '~modules/category/application/dto/update-category.dto';
import { CreateCategoryUseCase } from '~modules/category/application/use-cases/create-category.use-case';
import { ListCategoriesUseCase } from '~modules/category/application/use-cases/list-categories.use-case';
import { SoftDeleteCategoryUseCase } from '~modules/category/application/use-cases/soft-delete-category.use-case';
import { UpdateCategoryUseCase } from '~modules/category/application/use-cases/update-category.use-case';

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly create: CreateCategoryUseCase,
        private readonly update: UpdateCategoryUseCase,
        private readonly softDelete: SoftDeleteCategoryUseCase,
        private readonly listCategories: ListCategoriesUseCase,
    ) { }

    @Post()
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.create.execute(dto.name, dto.parentId);
    }

    @Get()
    list() {
        return this.listCategories.execute();
    }

    @Patch(':id')
    updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        return this.update.execute(id, dto.name, dto.parentId);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.softDelete.execute(id);
    }
}
