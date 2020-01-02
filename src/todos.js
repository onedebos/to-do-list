import "../node_modules/materialize-css/dist/js/materialize.min.js";
import formatDistanceToNow from "../node_modules/date-fns/formatDistanceToNow/";
import M from "materialize-css";

// eslint-disable-next-line no-undef
let selectThis = require('./index');

const todoItems = (title, description, dueDate, priority) => {
  return {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    id: Date.now()
  };
};

const toDo = () => {
  

  const passToDosToObject = () => {
    const grabToDoSubmit = document.querySelector(".grab-todo");
    grabToDoSubmit.addEventListener("click", e => {
      e.preventDefault();
      let listTitle = document.getElementById("todo-title").value;
  
  let listDecription = document.getElementById("description").value;

  let listDate = document.querySelector("[data-list-date]").value;
  let listPriority = document.querySelector("[data-selected-todo-option]");
  let selectedPriority = listPriority[listPriority.selectedIndex].text;
  
      if(listTitle == '' || listDecription == ''  || listDate == 'dd / mm / yyyy' || listPriority == 'Choose your option') {
          M.toast({ html: "Please complete todo Form!" }, 1000);
      }else{

      const newToDo = todoItems(
        listTitle,
        listDecription,
        listDate,
        selectedPriority
      );

      let selectedCat = selectThis.categories.find(category => category.id === selectThis.selectedCatId);
      selectedCat.todos.push(newToDo);
      runToDo.renderToDo();
      selectThis.saveToLocalStorage();
      // console.log(selectThis.categories);
      

      }
    });
  };

  const renderToDo = () => {

    let selectedCat = selectThis.categories.find(category => category.id === selectThis.selectedCatId);
    
    console.log(selectedCat.todos);
  
    const getToDoUl = document.querySelector(".collapsible");
    selectThis.clearElement(getToDoUl);
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
  
    })
};


  return { passToDosToObject, renderToDo};
};



const runToDo = toDo();
runToDo.passToDosToObject();


export default toDo;
