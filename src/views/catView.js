import storage from '../model/sharedModel';
const index = require("../index");
import catModel from "../model/catModel";
import sharedViews from "../views/sharedViews";


import ToDoView from './toDoViews';


const renderCategories = (() => {
  const listContainer = set => {
    const listDisplayContainer = document.querySelector(
      "[data-list-display-container]"
    );
    listDisplayContainer.style.display = set;
  };
  const renderCat = () => {
    // render catgegories array to DOM
    sharedViews.clearElement(index.categoryContainer);
    index.categories.forEach(category => {
      const liElement = document.createElement("li");
      liElement.classList.add("category-item");
      liElement.dataset.catId = category.id;
      liElement.innerHTML = `<i class="tiny material-icons">crop_square</i> ${category.name}`;
      if (category.id == index.selectedCatId) {
        liElement.classList.add("active");
      }
      index.categoryContainer.appendChild(liElement);
    });
  };

  const render = () => {
    sharedViews.clearElement(index.categoryContainer);
    renderCat();
    let selectedCat;

    if (index.selectedCatId == 1) {
      listContainer("");

      selectedCat = index.categories.find(category => category.id == 1);

      index.catTitle.innerText = selectedCat.name;
      ToDoView.renderToDo(selectedCat);
    } else {
      listContainer("");
      selectedCat = index.categories.find(
        category => category.id == index.selectedCatId
      );
      index.catTitle.innerText = selectedCat.name;
      ToDoView.renderToDo(selectedCat);
      storage.saveToLocalStorage();
    }
  };

  const renderCatTwice = () => {
    const catInput = document.querySelector("[data-new-cat-input]");
    const categoryName = catInput.value;

    if (categoryName == null || categoryName == "") {
      sharedViews.displayErrorMessage("Please enter a category name");
    } else {
      const category = catModel.createCategory(categoryName);
      catInput.value = null;
      index.categories.push(category);
      storage.saveToLocalStorage();
      render();
    }
  };

  return { listContainer, renderCatTwice, render, renderCat };
})();

export default renderCategories;
