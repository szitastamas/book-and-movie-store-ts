import { Categories } from '../architecture/Categories';
import { IEntertainmentSource } from '../architecture/IEntertainmentSource';

type RadioSourceType = 'book' | 'movie'

export class UIProcessor {
  ownerTitle: HTMLLabelElement;
  form: HTMLFormElement;
  inputElements: HTMLInputElement[];
  itemList: HTMLUListElement;
  constructor() {
    this.ownerTitle = document.getElementById('owner-title') as HTMLLabelElement;
    this.form = document.getElementById('create-item-form') as HTMLFormElement;
    this.itemList = document.getElementById('entertainment-list') as HTMLUListElement;
    this.inputElements = Array.from(document.querySelectorAll('.form-input'));
    this.createOptionsForCategorySelection();
    this.attachReactionToRadioBtns();
  }

  public createSourceItem(item: IEntertainmentSource): HTMLLIElement {
    const element = document.createElement('li');
    element.className = 'entertainment-list-item';
    element.dataset.id = item.id;
    element.textContent = item.title;
    element.dataset.suitable = `${item.suitableForKids}`;
    return element;
  }

  public addSourceItemToList(element: HTMLLIElement) {
    this.itemList.append(element);
  }

  public removeListItem(id: string) {
      const element = this.itemList.querySelector(`[data-id="${id}"]`)
      if(element) element.remove();
  }
  private attachReactionToRadioBtns() {
    this.inputElements
      .filter((elem) => elem.name === 'type')
      .forEach((elem) => {
        elem.addEventListener('change', () =>
          this.updateOwnerTitle(elem.value as RadioSourceType)
        );
      });
  }

  private updateOwnerTitle(value: RadioSourceType) {
    if (value === 'book') this.ownerTitle.textContent = 'Author';
    else this.ownerTitle.textContent = 'Director';
  }

  private createOptionsForCategorySelection() {
    const select = this.inputElements.find((elem) => elem.id === 'category');

    Object.keys(Categories).forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key;

      select.appendChild(option);
    });
  }
}
