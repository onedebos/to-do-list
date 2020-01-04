import storage from "../model/sharedModel";
import ToDoModel from "../model/toDoModel";
import ToDoView from "../views/toDoViews";
import sharedViews from "../views/sharedViews";

const index = require("../index");

const toDo = () => {
  const passToDosToObject = () => {
    const grabToDoSubmit = document.querySelector(".grab-todo");
    grabToDoSubmit.addEventListener("click", e => {
      e.preventDefault();
      const listTitle = document.getElementById("todo-title");
      const theTitle = listTitle.value;

      const listDecription = document.getElementById("description").value;

      const listDate = document.querySelector("[data-list-date]").value;
      const listPriority = document.querySelector(
        "[data-selected-todo-option]"
      );
      const selectedPriority = listPriority[listPriority.selectedIndex].text;
      const todaysDate = new Date();
      if (
        theTitle == "" ||
        listDecription == "" ||
        listPriority == "Choose your option"
      ) {
        sharedViews.displayErrorMessage("Please complete todo Form!");
      } else if (listDate < todaysDate) {
        sharedViews.displayErrorMessage("Please enter a valid date!");
      } else {
        const newToDo = ToDoModel.todoItems(
          theTitle,
          listDecription,
          listDate,
          selectedPriority
        );

        let selectedCat;
        if (index.categories.length == 1) {
          selectedCat = index.categories.find(category => category.id == 1);
        } else {
          selectedCat = index.categories.find(
            category => category.id == index.selectedCatId
          );
        }
        selectedCat.todos.push(newToDo);
        ToDoView.renderToDo(selectedCat);
        storage.saveToLocalStorage();
      }
    });
  };

  
  return { passToDosToObject };
};

export default toDo;
