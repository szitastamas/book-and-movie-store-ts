import { v4 } from 'uuid';
import { Categories } from "../architecture/Categories";
import { IBookInitialization, IEntertainmentSource } from "../architecture/IEntertainmentSource";

export class Book implements IEntertainmentSource {
    id: string;
    title: string;
    plot: string;
    length: number;
    category: Categories;
    author: string;

    constructor(init: IBookInitialization) {
        this.id = v4();
        this.title = init.title;
        this.plot = init.plot ?? '';
        this.length = init.length ?? 0;
        this.category = init.category;
        this.author = init.author;
    }

    get suitableForKids() {
        return this.category !== Categories.Horror && this.category !== Categories.Thriller;
    };

}