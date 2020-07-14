import { Category } from './category.model';

export class UpdatePost {
    public topic: string;
    public description: string;
    public comment: any;
        // tslint:disable-next-line: variable-name
    public category: any;
    public categoryObj: Category;
}
// To update topic by id: Baseurl/forum/topic/:id. payload => topic, description, category, comment (PUT request)
