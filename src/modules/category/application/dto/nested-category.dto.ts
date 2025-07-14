export class NestedCategoryDto {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    children: NestedCategoryDto[];
}
