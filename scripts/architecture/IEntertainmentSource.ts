import { Categories } from "./Categories";

export interface IEntertainmentSource {
    id: string;
    title: string;
    plot: string;
    length: number;
    category: Categories;
    suitableForKids: boolean;
}

export interface IFormSubmit {
    type: 'book' | 'movie';
    title: string;
    plot: string;
    length: number;
    category: Categories;
    owner: string;
}

interface IInitialization {
    title: string;
    plot?: string;
    length?: number;
    category: Categories,
}

export interface IBookInitialization extends IInitialization {
    author: string;
}

export interface IMovieInitialization extends IInitialization {
    director: string;
}