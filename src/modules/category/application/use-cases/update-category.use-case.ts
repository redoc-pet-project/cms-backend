import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';

@Injectable()
export class UpdateCategoryUseCase {
    constructor(private readonly repo: ICategoryRepository) { }

    async execute(id: string, name?: string, parentId?: string | null) {
        const existing = await this.repo.findById(id);
        if (!existing || existing.deletedAt) throw new NotFoundException();

        const updated = existing.update({ name: name ?? existing.name, parentId: parentId ?? existing.parentId })

        await this.repo.update(id, updated);
    }
}
