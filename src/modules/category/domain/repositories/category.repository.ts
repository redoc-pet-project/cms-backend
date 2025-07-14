import { Category } from '../entities/category.entity';

export abstract class ICategoryRepository {
    abstract save(category: Category): Promise<Category>;

    abstract update(id: string, category: Category): Promise<boolean>;

    abstract findById(id: string): Promise<Category | null>;

    abstract findAll(): Promise<Category[]>;

    abstract softDelete(id: string): Promise<void>;
}
