import toDo from './todos';
const index = require("./index");
// import indexx from './index'
const runToDo = toDo();
// const runIndex = indexx();
// runIndex.index2;


const category = () => {
  const createCategory = (name) => ({ name, id: Date.now(), todos: [] });

  const render = () => {
    index.clearElement(index.categoryContainer);
    index.renderCat();
    let selectedCat;

    if (index.selectedCatId == 1) {
      index.listDisplayContainer.style.display = '';
      selectedCat = index.categories.find((category) => category.id === 1);
      index.catTitle.innerText = selectedCat.name;
      runToDo.renderToDo(selectedCat);
    } else {
      index.listDisplayContainer.style.display = '';
      selectedCat = index.categories.find(
        (category) => category.id == index.selectedCatId,
      );
      index.catTitle.innerText = selectedCat.name;
      runToDo.renderToDo(selectedCat);
      index.saveToLocalStorage();
    }
  };

  return { createCategory, render };
};


// runIndex;


export default category;
