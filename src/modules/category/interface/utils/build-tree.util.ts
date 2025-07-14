import { NestedCategoryDto } from "~modules/category/application/dto/nested-category.dto";
import { Category } from "~modules/category/domain/entities/category.entity";

export const buildTree = (categories: Category[]): NestedCategoryDto[] => {
    const map = new Map<string, NestedCategoryDto>();

    // Init all as map
    for (const cat of categories) {
        map.set(cat.id, { ...cat, children: [] });
    }

    const roots: NestedCategoryDto[] = [];

    for (const cat of categories) {
        const item = map.get(cat.id)!;
        if (cat.parentId) {
            const parent = map.get(cat.parentId);
            if (parent) {
                parent.children.push(item);
            }
        } else {
            roots.push(item);
        }
    }

    return roots;
}