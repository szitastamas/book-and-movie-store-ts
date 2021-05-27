import {
  IBookInitialization,
  IEntertainmentSource,
  IFormSubmit,
  IMovieInitialization
} from '../architecture/IEntertainmentSource';
import { Book } from './Book';
import { Movie } from './Movie';
import { UIProcessor } from './UIProcessor';

export default class EntertainmentStore {
  sources: IEntertainmentSource[] = [];

  uiProcessor: UIProcessor;

  constructor() {
    this.uiProcessor = new UIProcessor();
    this.uiProcessor.form.addEventListener('submit', (e) => this.processFormInput(e));
  }

  addSource(item: IEntertainmentSource) {
    this.sources.unshift(item);

    const listItem = this.uiProcessor.createSourceItem(item);
    listItem.addEventListener('click', () => this.remove(item.id));

    this.uiProcessor.addSourceItemToList(listItem);
  }

  getById(id: string): IEntertainmentSource | undefined {
    return this.sources.find((item) => item.id === id);
  }

  remove(id: string) {
    const index = this.sources.findIndex((item) => item.id === id);
    if (index === -1) return;

    this.sources.splice(index, 1);
    this.uiProcessor.removeListItem(id);
  }
  private processFormInput(event: Event) {
    event.preventDefault();
    
    const submitData = this.uiProcessor.inputElements.reduce(
      (acc, item: HTMLInputElement) => {
        if (item.type === 'radio' && !item.checked) return acc;

        acc[item.name] = item.value;
        return acc;
      },
      {}
    ) as IFormSubmit;

    let item: IEntertainmentSource;
    
    let initObject = {
      title: submitData.title,
      plot: submitData.plot,
      category: submitData.category,
      length: submitData.length,
    };

    if (submitData.type === 'book') {
      initObject['author'] = submitData.owner;
      item = new Book(initObject as IBookInitialization);
    } else {
      initObject['director'] = submitData.owner;
      item = new Movie(initObject as IMovieInitialization);
    }
    
    this.addSource(item);
  }
}
