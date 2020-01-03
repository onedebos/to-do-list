
import M from 'materialize-css';
import formatDistanceToNow from "../node_modules/date-fns/formatDistanceToNow/";

// eslint-disable-next-line no-undef
const index = require('./index');

export const todoItems = (title, description, dueDate, priority) => ({
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    id: Date.now()
  });

const toDo = () => {
  const passToDosToObject = () => {
    const grabToDoSubmit = document.querySelector('.grab-todo');
    grabToDoSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const listTitle = document.getElementById('todo-title');
      const theTitle = listTitle.value;

      const listDecription = document.getElementById('description').value;

      const listDate = document.querySelector('[data-list-date]').value;
      const listPriority = document.querySelector('[data-selected-todo-option]');
      const selectedPriority = listPriority[listPriority.selectedIndex].text;
      const todaysDate = new Date();
      if (
        theTitle == '' ||
        listDecription == '' ||
        listPriority == 'Choose your option '
      ) {
        M.toast({ html: 'Please complete todo Form!' }, 1000);
      } else if (listDate < todaysDate) {
        M.toast({ html: 'Please enter a valid date!' }, 1000);
      } else {
        const newToDo = todoItems(
          theTitle,
          listDecription,
          listDate,
          selectedPriority,
        )

        let selectedCat;
        if (index.categories.length == 1) {
          selectedCat = index.categories.find((category) => category.id == 1);
        } else {
          selectedCat = index.categories.find(
            (category) => category.id == index.selectedCatId,
          );
        }

        selectedCat.todos.push(newToDo);
        renderToDo(selectedCat);
        index.saveToLocalStorage();
      }
    });
  };

  const renderToDo = (selectedCat) => {
    index.clearElement(index.getToDoUl);
    selectedCat.todos.forEach((todo) => {
      const createToDoLi = document.createElement('li');
      createToDoLi.dataset.todoId = todoItems().id;
      createToDoLi.innerHTML = `
          
    
        <div class="collapsible-header">
          <div class="col">
            <i class="material-icons">attach_file</i>
            
          </div>
          <strong>${todo.title}</strong>
          <div class="col s6"><span>Due in ${formatDistanceToNow(
    new Date(todo.dueDate),
    true,
  )}</span></div>
        </div>
        <div class="collapsible-body">
          <span>${todo.description}</span>
          <p>Due date: ${todo.dueDate}</p>
          <p>${todo.priority}</p>
        </div>
    `;

      index.getToDoUl.appendChild(createToDoLi);
    });
  };

  return { passToDosToObject, renderToDo };
};

export default toDo;
