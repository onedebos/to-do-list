/* eslint-disable react/react-in-jsx-scope */


import M from 'materialize-css';
import toDo from './todos';
import category from './category';
import categoryModel from './catModel'




export const getToDoUl = document.querySelector('.collapsible');
const LOCAL_STORAGE_SELECTED_CAT_ID_KEY = 'todos.selectedCatId';
export let selectedCatId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CAT_ID_KEY) || 1;
export const LOCAL_STORAGE_CATEGORY_KEY = 'todos.categories';

const catInputForm = document.querySelector('.new-cat-form');
const catInput = document.querySelector('[data-new-cat-input]');
export const catTitle = document.querySelector('[data-list-title]');
export const categoryContainer = document.querySelector('[data-categories]');
export const listDisplayContainer = document.querySelector(
  '[data-list-display-container]',
);
const delCatBtn = document.querySelector('[data-delete-cat-btn]');
const addCatBtn = document.querySelector('.add-cat');

export let categories = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)
) || [{ name: 'new todos', id: 1, todos: [] }];



const runToDo = toDo();
const runCategories = category();
const runCatModel = categoryModel();

// clear catObject.categories when DOM loads
export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};



const renderCatTwice = () => {
  const categoryName = catInput.value;

  if (categoryName == null || categoryName == '') {
    M.toast({ html: 'Please enter a category name!' }, 1000);
  } else {
    const category = runCatModel.createCategory(categoryName);
    catInput.value = null;
    categories.push(category);
    saveToLocalStorage();
    runCategories.render();
  }
};

const grabCatInput = () => {
  catInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCatTwice();
  });

  addCatBtn.addEventListener('click', e => {
    e.preventDefault();
    renderCatTwice();
  });
};



const storeCatId = (el) => {
  if (el.classList.contains('category-item')) {
    selectedCatId = el.getAttribute('data-cat-id');
  }
};

export const saveToLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(categories));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_CAT_ID_KEY, selectedCatId);
};


categoryContainer.addEventListener('click', (e) => {
  storeCatId(e.target);
  saveToLocalStorage();
  runCategories.render();
});



delCatBtn.addEventListener('click', () => {
  categories = categories.filter((category) => category.id != selectedCatId);

  selectedCatId = null;
  renderWhenNoCats();
  saveToLocalStorage();
});




const renderWhenNoCats = () => {
  renderCat();
  listDisplayContainer.style.display = 'none';
};

export const renderCat = () => {
  // render catgegories array to DOM
  clearElement(categoryContainer);
  categories.forEach((category) => {
    const liElement = document.createElement('li');
    liElement.classList.add('category-item');
    liElement.dataset.catId = category.id;
    liElement.innerHTML = `<i class="tiny material-icons">crop_square</i> ${category.name}`;
    if (category.id == selectedCatId) {
      liElement.classList.add('active');
    }
    categoryContainer.appendChild(liElement);
  });
};



document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elems);
});

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});




runToDo.passToDosToObject();
runCategories.render(); // Always load default category when DOM loads

grabCatInput();


