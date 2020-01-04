/* eslint-disable react/react-in-jsx-scope */

// eslint-disable-next-line no-unused-vars
import sharedController from "./controller/sharedController";
import storage from './model/sharedModel'
// eslint-disable-next-line no-unused-vars
import grabCatInput from "./controller/catController";
// eslint-disable-next-line no-unused-vars
import sharedViews from "./views/sharedViews";


import renderCategories from "./views/catView";
import toDo from "./controller/todoController";



export const getToDoUl = document.querySelector(".collapsible");
const LOCAL_STORAGE_SELECTED_CAT_ID_KEY = "todos.selectedCatId";
export const LOCAL_STORAGE_CATEGORY_KEY = "todos.categories";
export const catTitle = document.querySelector("[data-list-title]");
export const categoryContainer = document.querySelector("[data-categories]");
const delCatBtn = document.querySelector("[data-delete-cat-btn]");
export let categories = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)
) || [{ name: "new todos", id: 1, todos: [] }];
export let selectedCatId =
  localStorage.getItem(LOCAL_STORAGE_SELECTED_CAT_ID_KEY) || 1;

const runToDo = toDo();

const storeCatId = el => {
  if (el.classList.contains("category-item")) {
    selectedCatId = el.getAttribute("data-cat-id");
  }
};



categoryContainer.addEventListener("click", e => {
  storeCatId(e.target);
  storage.saveToLocalStorage();
  renderCategories.render();
});

delCatBtn.addEventListener("click", () => {
  categories = categories.filter(category => category.id != selectedCatId);

  selectedCatId = null;
  renderWhenNoCats();
  storage.saveToLocalStorage();
});

const renderWhenNoCats = () => {
  renderCategories.renderCat();
  renderCategories.listContainer("none");
};

runToDo.passToDosToObject();
renderCategories.render(); // Always load default category when DOM loads
