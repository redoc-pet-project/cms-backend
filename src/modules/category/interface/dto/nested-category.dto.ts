import { Category } from "~modules/category/domain/entities/category.entity";

export class NestedCategoryDto {
    id: string;
    name: string;
    parentId: string | null;
    children: NestedCategoryDto[];

    constructor(props: {
        id: string;
        name: string;
        parentId: string | null;
        children?: NestedCategoryDto[];
    }) {
        this.id = props.id;
        this.name = props.name;
        this.parentId = props.parentId;
        this.children = props.children ?? [];
    }

    static fromDomain(category: Category): NestedCategoryDto {
        return new NestedCategoryDto({
            id: category.id,
            name: category.name,
            parentId: category.parentId,
        });
    }
}
