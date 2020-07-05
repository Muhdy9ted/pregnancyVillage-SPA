import { Category } from './category.model';
import { GetComment } from './get-comment.model';

export interface GetPost {
    __v: number;
​​    _id: string;​​​
    active: boolean;
​​​    approval_status: string;
​​​    category: Category;
​​​    comment: GetComment[];
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


