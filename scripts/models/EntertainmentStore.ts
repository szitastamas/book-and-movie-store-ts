import { IEntertainmentSource, IFormSubmit } from '../architecture/IEntertainmentSource';
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
    this.uiProcessor.addItemToSourceList(item);
  }

  getById(id: string): IEntertainmentSource | undefined {
    return this.sources.find((item) => item.id === id);
  }

  remove(id: string) {
    const index = this.sources.findIndex((item) => item.id === id);
    if (index === -1) return;

    this.sources.splice(index, 1);
  }
  private processFormInput(event) {
    event.preventDefault();

    const submitData = this.uiProcessor.inputElements.reduce(
      (acc, item: HTMLInputElement) => {
        if (item.type === 'radio' && !item.checked) return acc;
        
        acc[item.name] = item.value;
        return { ...acc };
      },
      {}
    ) as IFormSubmit;

    let item: IEntertainmentSource;
    console.log(submitData);
    if (submitData.type === 'book') {
      item = new Book({
        title: submitData.title,
        plot: submitData.plot,
        category: submitData.category,
        author: submitData.owner,
        length: submitData.length,
      });
    } else {
      item = new Movie({
        title: submitData.title,
        plot: submitData.plot,
        category: submitData.category,
        director: submitData.owner,
        length: submitData.length,
      });
    }

    this.addSource(item);
  }
}
