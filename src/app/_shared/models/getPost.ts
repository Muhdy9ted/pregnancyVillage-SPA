import { Category } from './category.model';

export interface GetPost {
    __v: number;
​​    _id: string;​​​
    active: boolean;
​​​    approval_status: string;
​​​    category: Category;
​​​    comment: [];
​​​    createdAt: string;
    description: string;
​​​    id: string;
​​​    likes: number;
​​​    nameHash: string;
​​​    topic: string;
​​​    totalCommentCount: number;
​​​    userId: string;
    upload_file: string;
}
