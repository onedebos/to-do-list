/* eslint-disable react/react-in-jsx-scope */

import "../node_modules/materialize-css/dist/js/materialize.min.js";
import M from "materialize-css";
import formatDistanceToNow from "../node_modules/date-fns/formatDistanceToNow/";

// import toDo from './todos'

const catInputForm = document.querySelector('.new-cat-form');
const catInput = document.querySelector("[data-new-cat-input]");

const categoryContainer = document.querySelector("[data-categories]");
const getToDoUl = document.querySelector(".collapsible");
const LOCAL_STORAGE_CATEGORY_KEY = 'todos.categories';
const LOCAL_STORAGE_SELECTED_CAT_ID_KEY = 'todos.selectedCatId';
export let categories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)) || [{name:'new todos', id:1, todos:[]}];
export let selectedCatId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CAT_ID_KEY) || 1;



// eslint-disable-next-line no-undef
let catObject = require('./category');


const catTitle = document.querySelector('[data-list-title]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const delCatBtn = document.querySelector("[data-delete-cat-btn]");
// const runToDos = toDo();

categoryContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() == 'li'){
      selectedCatId = e.target.dataset.catId;
      saveToLocalStorage();
      render();

  }
})



delCatBtn.addEventListener('click', () => {
    categories = categories.filter( category => category.id !==selectedCatId);
    
    selectedCatId = null;
    saveToLocalStorage();
    render();
})

export const saveToLocalStorage = () =>{
    localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY,JSON.stringify(categories));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_CAT_ID_KEY, selectedCatId);
}





const render = () => {
    clearElement(categoryContainer);
    renderCat();    
    let selectedCat = categories.find(category => category.id === selectedCatId);

    
    if (selectedCatId == 1){
      listDisplayContainer.style.display = '';
      selectedCat = categories.find(category => category.id === 1);
      catTitle.innerText = selectedCat.name;
      renderToDo(selectedCat);
    }else{
        listDisplayContainer.style.display = '';
        catTitle.innerText = selectedCat.name;
        // runToDos.renderToDo();
        renderToDo(selectedCat);
        saveToLocalStorage();
            
    }
  }
  
  // on Enter add category to array and DOM
  const grabCatInput = () => {
    
      catInputForm.addEventListener("submit", event => {
      event.preventDefault();
      const categoryName = catInput.value;

      if (categoryName == null || categoryName == "") {
        M.toast({ html: "Please enter a category name!" }, 1000);
      } else {
        const category = catObject.createCategory(categoryName);
        catInput.value = null;
        categories.push(category);
        saveToLocalStorage();
        render();

        console.log(categories);
      }
    });
  };

  // return { grabCatInput };
// };

const renderCat = () =>{
     // render catgegories array to DOM
  clearElement(categoryContainer);
  categories.forEach(category => {
    const liElement = document.createElement("li");
    liElement.classList.add("category-item");
    liElement.dataset.catId = category.id;
    liElement.innerHTML = `<i class="tiny material-icons">crop_square</i> ${category.name}`;
    if(category.id == selectedCatId){
        liElement.classList.add('active');
    }
    categoryContainer.appendChild(liElement);
  });

}

// clear categories when DOM loads
export const clearElement = element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };


document.addEventListener("DOMContentLoaded", function() {
  const elems = document.querySelectorAll(".collapsible");
  M.Collapsible.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  });



  const todoItems = (title, description, dueDate, priority) => {
    return {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      id: Date.now()
    };
  };
  
    const passToDosToObject = () => {
      const grabToDoSubmit = document.querySelector(".grab-todo");
      grabToDoSubmit.addEventListener("click", e => {
        e.preventDefault();
        let listTitle = document.getElementById("todo-title").value;
  
        let listDecription = document.getElementById("description").value;
  
        let listDate = document.querySelector("[data-list-date]").value;
        let listPriority = document.querySelector("[data-selected-todo-option]");
        let selectedPriority = listPriority[listPriority.selectedIndex].text;
  
        if (
          listTitle == "" ||
          listDecription == "" ||
          listDate == "dd / mm / yyyy" ||
          listPriority == "Choose your option"
        ) {
          M.toast({ html: "Please complete todo Form!" }, 1000);
        } else {
          const newToDo = todoItems(
            listTitle,
            listDecription,
            listDate,
            selectedPriority
          );
  
           const selectedCat = categories.find(
            category => category.id === selectedCatId
          );
          selectedCat.todos.push(newToDo);
          // runToDo.renderToDo();
          renderToDo(selectedCat);
          saveToLocalStorage();
          // console.log(selectThis.categories);
        }
      });
    };
  
    const renderToDo = (selectedCat) => {
      // selectedCat = categories.find(
      //   category => category.id === selectedCatId
      // );
  
      console.log(categories);
      

      clearElement(getToDoUl);
      selectedCat.todos.forEach(todo => {
        const createToDoLi = document.createElement("li");
        createToDoLi.dataset.todoId = todoItems().id;
        createToDoLi.innerHTML = `
          
    
        <div class="collapsible-header">
          <div class="col">
            <i class="material-icons">attach_file</i>
            
          </div>
          <strong>${todo.title}</strong>
          <div class="col s6"><span>Due in ${formatDistanceToNow(
            new Date(todo.dueDate),
            true
          )}</span></div>
        </div>
        <div class="collapsible-body">
          <span>${todo.description}</span>
          <p>Due date: ${todo.dueDate}</p>
          <p>${todo.priority}</p>
        </div>
    `;
  
        getToDoUl.appendChild(createToDoLi);
        
      });
    }
  
  //   return { passToDosToObject, renderToDo };
  // };
  
  // const runToDo = toDo();
  // runToDo.passToDosToObject();
  



// render();
// const rend = render();
// rend.grabCatInput();

// renderToDo();
render(); //Always load default category when DOM loads
// toDo();
passToDosToObject();
grabCatInput();