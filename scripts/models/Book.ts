import { v4 } from 'uuid';
import { Categories } from "../architecture/Categories";
import { IBookInitialization, IEntertainmentSource } from "../architecture/IEntertainmentSource";

export class Book implements IEntertainmentSource {
    id: string;
    title: string;
    plot: string;
    length: number;
    category: Categories;

    constructor(init: IBookInitialization) {
        this.id = v4();
        this.title = init.title;
        this.plot = init.plot ?? '';
        this.length = init.length ?? 0;
        this.category = init.category;
    }

    get suitableForKids() {
        return this.category !== Categories.Horror && this.category !== Categories.Thriller;
    };

}