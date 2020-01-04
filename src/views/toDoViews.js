import sharedViews from "../views/sharedViews";


// eslint-disable-next-line no-undef
const index = require("../index");
import formatDistanceToNow from "/home/adebola/Documents/microverse/javascript/to-do-list/node_modules/date-fns/formatDistanceToNow";



const ToDoView = (() => {
  const renderToDo = selectedCat => {
    sharedViews.clearElement(index.getToDoUl);
    selectedCat.todos.forEach(todo => {
      const createToDoLi = document.createElement("li");
      createToDoLi.dataset.todoId = todo.id;
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
              <div class="col del-hover">
              <i class="material-icons del-todo" data-del-todo-btn=${todo.id}>delete</i>
              
            </div>
              <div
            </div>
            <div class="collapsible-body white-text">
              <span>${todo.description}</span>
              <p>Due date: ${todo.dueDate}</p>
              <p>${todo.priority}</p>
            </div>
        `;

      index.getToDoUl.appendChild(createToDoLi);
     

    });
  };

  return { renderToDo };
})();

export default ToDoView;
