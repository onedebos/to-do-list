/* eslint-disable react/react-in-jsx-scope */

import '../node_modules/materialize-css/dist/js/materialize.min.js';
import M from 'materialize-css';
import formatDistance from '../node_modules/date-fns/formatDistance/';
import subDays from '../node_modules/date-fns/subDays/';


const categoryContainer = document.querySelector("[data-categories]");
const categories = [
  { name: "name", id: 1 },
  { name: "todo", id: 2 }
];


const render = () => {
  // clear categories when DOM loads
  const clearElement = element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  // render catgegories array to DOM
  clearElement(categoryContainer);
  categories.forEach(category => {
    const liElement = document.createElement("li");
    liElement.classList.add("category-item");
    liElement.dataset.catId = category.id;
    liElement.innerHTML = `<i class="tiny material-icons">crop_square</i> ${category.name}`;
    categoryContainer.appendChild(liElement);
  });

  // on Enter add category to array and DOM
  const grabCatInput = () => {
    const catInputForm = document.querySelector('[data-new-cat-form]');
    const catInput = document.querySelector('[data-new-cat-input]');
      catInputForm.addEventListener('submit', event => {
      event.preventDefault();
      const categoryName = catInput.value;

      if(categoryName == null || categoryName == ''){
        M.toast({html: 'Please enter a category name!'}, 1000);        
      }else{
         const category = createCategory(categoryName)
      }

    });
  };

 

  return { grabCatInput};
};

const createCategory = (name) => {
      return {name:name}
}

// render();
const rend = render();
rend.grabCatInput();

console.log(formatDistance(subDays(new Date(), 2), new Date())
);
