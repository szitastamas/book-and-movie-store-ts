/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/architecture/Categories.ts":
/*!********************************************!*\
  !*** ./scripts/architecture/Categories.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Categories = void 0;
var Categories;
(function (Categories) {
    Categories["Horror"] = "Horror";
    Categories["Crime"] = "Crime";
    Categories["Comedy"] = "Comedy";
    Categories["Romance"] = "Romance";
    Categories["Documentary"] = "Documentary";
    Categories["Thriller"] = "Thriller";
    Categories["History"] = "History";
})(Categories = exports.Categories || (exports.Categories = {}));


/***/ }),

/***/ "./scripts/models/Book.ts":
/*!********************************!*\
  !*** ./scripts/models/Book.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Book = void 0;
const Categories_1 = __webpack_require__(/*! ../architecture/Categories */ "./scripts/architecture/Categories.ts");
class Book {
    constructor(init) {
        var _a, _b;
        this.title = init.title;
        this.plot = (_a = init.plot) !== null && _a !== void 0 ? _a : '';
        this.length = (_b = init.length) !== null && _b !== void 0 ? _b : 0;
        this.category = init.category;
    }
    get suitableForKids() {
        return this.category === Categories_1.Categories.Horror || this.category === Categories_1.Categories.Thriller;
    }
    ;
}
exports.Book = Book;


/***/ }),

/***/ "./scripts/models/EntertainmentStore.ts":
/*!**********************************************!*\
  !*** ./scripts/models/EntertainmentStore.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Book_1 = __webpack_require__(/*! ./Book */ "./scripts/models/Book.ts");
const Movie_1 = __webpack_require__(/*! ./Movie */ "./scripts/models/Movie.ts");
const UIProcessor_1 = __webpack_require__(/*! ./UIProcessor */ "./scripts/models/UIProcessor.ts");
class EntertainmentStore {
    constructor() {
        this.sources = [];
        this.uiProcessor = new UIProcessor_1.UIProcessor();
        this.uiProcessor.form.addEventListener('submit', (e) => this.processFormInput(e));
    }
    addSource(item) {
        this.sources.unshift(item);
        this.uiProcessor.addItemToSourceList(item);
    }
    getById(id) {
        return this.sources.find((item) => item.id === id);
    }
    remove(id) {
        const index = this.sources.findIndex((item) => item.id === id);
        if (index === -1)
            return;
        this.sources.splice(index, 1);
    }
    processFormInput(event) {
        event.preventDefault();
        const submitData = this.uiProcessor.inputElements.reduce((acc, item) => {
            acc[item.id] = item.value;
            return Object.assign({}, acc);
        }, {});
        let item;
        if (submitData.type === 'book') {
            item = new Book_1.Book({
                title: submitData.title,
                plot: submitData.plot,
                category: submitData.category,
                author: submitData.owner,
                length: submitData.length,
            });
        }
        else {
            item = new Movie_1.Movie({
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
exports.default = EntertainmentStore;


/***/ }),

/***/ "./scripts/models/Movie.ts":
/*!*********************************!*\
  !*** ./scripts/models/Movie.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Movie = void 0;
const Categories_1 = __webpack_require__(/*! ../architecture/Categories */ "./scripts/architecture/Categories.ts");
class Movie {
    constructor(init) {
        var _a, _b;
        this.title = init.title;
        this.plot = (_a = init.plot) !== null && _a !== void 0 ? _a : '';
        this.length = (_b = init.length) !== null && _b !== void 0 ? _b : 0;
        this.category = init.category;
    }
    get suitableForKids() {
        return this.category === Categories_1.Categories.Horror || this.category === Categories_1.Categories.Thriller;
    }
    ;
}
exports.Movie = Movie;


/***/ }),

/***/ "./scripts/models/UIProcessor.ts":
/*!***************************************!*\
  !*** ./scripts/models/UIProcessor.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UIProcessor = void 0;
const Categories_1 = __webpack_require__(/*! ../architecture/Categories */ "./scripts/architecture/Categories.ts");
class UIProcessor {
    constructor() {
        this.ownerTitle = document.getElementById('owner-title');
        this.form = document.getElementById('create-item-form');
        this.itemList = document.getElementById('entertainment-list');
        this.inputElements = Array.from(document.querySelectorAll('.form-input'));
        this.createOptionsForCategorySelection();
        this.attachReactionToRadioBtns();
    }
    addItemToSourceList(item) {
        const element = document.createElement('li');
        element.className = 'entertainment-list-item';
        element.dataset.id = item.id;
        element.textContent = item.title;
        element.style.color = item.suitableForKids ? 'black' : 'red';
        this.itemList.prepend(element);
    }
    attachReactionToRadioBtns() {
        this.inputElements
            .filter((elem) => elem.name === 'type')
            .forEach((elem) => {
            elem.addEventListener('change', () => this.updateOwnerTitle(elem.value));
        });
    }
    updateOwnerTitle(value) {
        if (value === 'book')
            this.ownerTitle.textContent = 'Author';
        else
            this.ownerTitle.textContent = 'Director';
    }
    createOptionsForCategorySelection() {
        const select = this.inputElements.find((elem) => elem.id === 'category');
        const values = Object.keys(Categories_1.Categories).map((item) => item);
        values.forEach((val) => {
            const option = document.createElement('option');
            option.value = val;
            option.textContent = val;
            select.appendChild(option);
        });
    }
}
exports.UIProcessor = UIProcessor;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./scripts/main.ts ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const EntertainmentStore_1 = __webpack_require__(/*! ./models/EntertainmentStore */ "./scripts/models/EntertainmentStore.ts");
const store = new EntertainmentStore_1.default();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWt0Ly4vc2NyaXB0cy9hcmNoaXRlY3R1cmUvQ2F0ZWdvcmllcy50cyIsIndlYnBhY2s6Ly9wcm9qZWt0Ly4vc2NyaXB0cy9tb2RlbHMvQm9vay50cyIsIndlYnBhY2s6Ly9wcm9qZWt0Ly4vc2NyaXB0cy9tb2RlbHMvRW50ZXJ0YWlubWVudFN0b3JlLnRzIiwid2VicGFjazovL3Byb2pla3QvLi9zY3JpcHRzL21vZGVscy9Nb3ZpZS50cyIsIndlYnBhY2s6Ly9wcm9qZWt0Ly4vc2NyaXB0cy9tb2RlbHMvVUlQcm9jZXNzb3IudHMiLCJ3ZWJwYWNrOi8vcHJvamVrdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWt0Ly4vc2NyaXB0cy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0Msa0JBQWtCLEtBQUs7Ozs7Ozs7Ozs7O0FDWmpEO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELFlBQVk7QUFDWixxQkFBcUIsbUJBQU8sQ0FBQyx3RUFBNEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7Ozs7OztBQ2pCQztBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsd0NBQVE7QUFDL0IsZ0JBQWdCLG1CQUFPLENBQUMsMENBQVM7QUFDakMsc0JBQXNCLG1CQUFPLENBQUMsc0RBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ3BERjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxhQUFhO0FBQ2IscUJBQXFCLG1CQUFPLENBQUMsd0VBQTRCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7Ozs7Ozs7Ozs7QUNqQkE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CLHFCQUFxQixtQkFBTyxDQUFDLHdFQUE0QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7OztVQzdDbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCw2QkFBNkIsbUJBQU8sQ0FBQywyRUFBNkI7QUFDbEUiLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNhdGVnb3JpZXMgPSB2b2lkIDA7XHJcbnZhciBDYXRlZ29yaWVzO1xyXG4oZnVuY3Rpb24gKENhdGVnb3JpZXMpIHtcclxuICAgIENhdGVnb3JpZXNbXCJIb3Jyb3JcIl0gPSBcIkhvcnJvclwiO1xyXG4gICAgQ2F0ZWdvcmllc1tcIkNyaW1lXCJdID0gXCJDcmltZVwiO1xyXG4gICAgQ2F0ZWdvcmllc1tcIkNvbWVkeVwiXSA9IFwiQ29tZWR5XCI7XHJcbiAgICBDYXRlZ29yaWVzW1wiUm9tYW5jZVwiXSA9IFwiUm9tYW5jZVwiO1xyXG4gICAgQ2F0ZWdvcmllc1tcIkRvY3VtZW50YXJ5XCJdID0gXCJEb2N1bWVudGFyeVwiO1xyXG4gICAgQ2F0ZWdvcmllc1tcIlRocmlsbGVyXCJdID0gXCJUaHJpbGxlclwiO1xyXG4gICAgQ2F0ZWdvcmllc1tcIkhpc3RvcnlcIl0gPSBcIkhpc3RvcnlcIjtcclxufSkoQ2F0ZWdvcmllcyA9IGV4cG9ydHMuQ2F0ZWdvcmllcyB8fCAoZXhwb3J0cy5DYXRlZ29yaWVzID0ge30pKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Cb29rID0gdm9pZCAwO1xyXG5jb25zdCBDYXRlZ29yaWVzXzEgPSByZXF1aXJlKFwiLi4vYXJjaGl0ZWN0dXJlL0NhdGVnb3JpZXNcIik7XHJcbmNsYXNzIEJvb2sge1xyXG4gICAgY29uc3RydWN0b3IoaW5pdCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IGluaXQudGl0bGU7XHJcbiAgICAgICAgdGhpcy5wbG90ID0gKF9hID0gaW5pdC5wbG90KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IChfYiA9IGluaXQubGVuZ3RoKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBpbml0LmNhdGVnb3J5O1xyXG4gICAgfVxyXG4gICAgZ2V0IHN1aXRhYmxlRm9yS2lkcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXRlZ29yeSA9PT0gQ2F0ZWdvcmllc18xLkNhdGVnb3JpZXMuSG9ycm9yIHx8IHRoaXMuY2F0ZWdvcnkgPT09IENhdGVnb3JpZXNfMS5DYXRlZ29yaWVzLlRocmlsbGVyO1xyXG4gICAgfVxyXG4gICAgO1xyXG59XHJcbmV4cG9ydHMuQm9vayA9IEJvb2s7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEJvb2tfMSA9IHJlcXVpcmUoXCIuL0Jvb2tcIik7XHJcbmNvbnN0IE1vdmllXzEgPSByZXF1aXJlKFwiLi9Nb3ZpZVwiKTtcclxuY29uc3QgVUlQcm9jZXNzb3JfMSA9IHJlcXVpcmUoXCIuL1VJUHJvY2Vzc29yXCIpO1xyXG5jbGFzcyBFbnRlcnRhaW5tZW50U3RvcmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VzID0gW107XHJcbiAgICAgICAgdGhpcy51aVByb2Nlc3NvciA9IG5ldyBVSVByb2Nlc3Nvcl8xLlVJUHJvY2Vzc29yKCk7XHJcbiAgICAgICAgdGhpcy51aVByb2Nlc3Nvci5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB0aGlzLnByb2Nlc3NGb3JtSW5wdXQoZSkpO1xyXG4gICAgfVxyXG4gICAgYWRkU291cmNlKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLnNvdXJjZXMudW5zaGlmdChpdGVtKTtcclxuICAgICAgICB0aGlzLnVpUHJvY2Vzc29yLmFkZEl0ZW1Ub1NvdXJjZUxpc3QoaXRlbSk7XHJcbiAgICB9XHJcbiAgICBnZXRCeUlkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlcy5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoaWQpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zb3VyY2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzRm9ybUlucHV0KGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBzdWJtaXREYXRhID0gdGhpcy51aVByb2Nlc3Nvci5pbnB1dEVsZW1lbnRzLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGFjY1tpdGVtLmlkXSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBhY2MpO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgICAgICBsZXQgaXRlbTtcclxuICAgICAgICBpZiAoc3VibWl0RGF0YS50eXBlID09PSAnYm9vaycpIHtcclxuICAgICAgICAgICAgaXRlbSA9IG5ldyBCb29rXzEuQm9vayh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogc3VibWl0RGF0YS50aXRsZSxcclxuICAgICAgICAgICAgICAgIHBsb3Q6IHN1Ym1pdERhdGEucGxvdCxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBzdWJtaXREYXRhLmNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgYXV0aG9yOiBzdWJtaXREYXRhLm93bmVyLFxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBzdWJtaXREYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtID0gbmV3IE1vdmllXzEuTW92aWUoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHN1Ym1pdERhdGEudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBwbG90OiBzdWJtaXREYXRhLnBsb3QsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogc3VibWl0RGF0YS5jYXRlZ29yeSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdG9yOiBzdWJtaXREYXRhLm93bmVyLFxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBzdWJtaXREYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkU291cmNlKGl0ZW0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEVudGVydGFpbm1lbnRTdG9yZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Nb3ZpZSA9IHZvaWQgMDtcclxuY29uc3QgQ2F0ZWdvcmllc18xID0gcmVxdWlyZShcIi4uL2FyY2hpdGVjdHVyZS9DYXRlZ29yaWVzXCIpO1xyXG5jbGFzcyBNb3ZpZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0KSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICB0aGlzLnRpdGxlID0gaW5pdC50aXRsZTtcclxuICAgICAgICB0aGlzLnBsb3QgPSAoX2EgPSBpbml0LnBsb3QpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gKF9iID0gaW5pdC5sZW5ndGgpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDA7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGluaXQuY2F0ZWdvcnk7XHJcbiAgICB9XHJcbiAgICBnZXQgc3VpdGFibGVGb3JLaWRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5ID09PSBDYXRlZ29yaWVzXzEuQ2F0ZWdvcmllcy5Ib3Jyb3IgfHwgdGhpcy5jYXRlZ29yeSA9PT0gQ2F0ZWdvcmllc18xLkNhdGVnb3JpZXMuVGhyaWxsZXI7XHJcbiAgICB9XHJcbiAgICA7XHJcbn1cclxuZXhwb3J0cy5Nb3ZpZSA9IE1vdmllO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlVJUHJvY2Vzc29yID0gdm9pZCAwO1xyXG5jb25zdCBDYXRlZ29yaWVzXzEgPSByZXF1aXJlKFwiLi4vYXJjaGl0ZWN0dXJlL0NhdGVnb3JpZXNcIik7XHJcbmNsYXNzIFVJUHJvY2Vzc29yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMub3duZXJUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvd25lci10aXRsZScpO1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtaXRlbS1mb3JtJyk7XHJcbiAgICAgICAgdGhpcy5pdGVtTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbnRlcnRhaW5tZW50LWxpc3QnKTtcclxuICAgICAgICB0aGlzLmlucHV0RWxlbWVudHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLWlucHV0JykpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlT3B0aW9uc0ZvckNhdGVnb3J5U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hSZWFjdGlvblRvUmFkaW9CdG5zKCk7XHJcbiAgICB9XHJcbiAgICBhZGRJdGVtVG9Tb3VyY2VMaXN0KGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdlbnRlcnRhaW5tZW50LWxpc3QtaXRlbSc7XHJcbiAgICAgICAgZWxlbWVudC5kYXRhc2V0LmlkID0gaXRlbS5pZDtcclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gaXRlbS50aXRsZTtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gaXRlbS5zdWl0YWJsZUZvcktpZHMgPyAnYmxhY2snIDogJ3JlZCc7XHJcbiAgICAgICAgdGhpcy5pdGVtTGlzdC5wcmVwZW5kKGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgYXR0YWNoUmVhY3Rpb25Ub1JhZGlvQnRucygpIHtcclxuICAgICAgICB0aGlzLmlucHV0RWxlbWVudHNcclxuICAgICAgICAgICAgLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5uYW1lID09PSAndHlwZScpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy51cGRhdGVPd25lclRpdGxlKGVsZW0udmFsdWUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU93bmVyVGl0bGUodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICdib29rJylcclxuICAgICAgICAgICAgdGhpcy5vd25lclRpdGxlLnRleHRDb250ZW50ID0gJ0F1dGhvcic7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm93bmVyVGl0bGUudGV4dENvbnRlbnQgPSAnRGlyZWN0b3InO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlT3B0aW9uc0ZvckNhdGVnb3J5U2VsZWN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IHRoaXMuaW5wdXRFbGVtZW50cy5maW5kKChlbGVtKSA9PiBlbGVtLmlkID09PSAnY2F0ZWdvcnknKTtcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSBPYmplY3Qua2V5cyhDYXRlZ29yaWVzXzEuQ2F0ZWdvcmllcykubWFwKChpdGVtKSA9PiBpdGVtKTtcclxuICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHZhbDtcclxuICAgICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5VSVByb2Nlc3NvciA9IFVJUHJvY2Vzc29yO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgRW50ZXJ0YWlubWVudFN0b3JlXzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvRW50ZXJ0YWlubWVudFN0b3JlXCIpO1xyXG5jb25zdCBzdG9yZSA9IG5ldyBFbnRlcnRhaW5tZW50U3RvcmVfMS5kZWZhdWx0KCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=