import { v4 } from 'uuid';
import { Categories } from "../architecture/Categories";
import { IEntertainmentSource, IMovieInitialization } from "../architecture/IEntertainmentSource";

export class Movie implements IEntertainmentSource {
    id: string;
    title: string;
    plot: string;
    length: number;
    category: Categories;
    constructor(init: IMovieInitialization) {
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