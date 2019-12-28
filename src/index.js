/* eslint-disable react/react-in-jsx-scope */
const categoryContainer = document.querySelector('[data-categories]');
let categories = ['name', 'todo'];

const render = () =>{
    categories.forEach(category => {
        const liElement = document.createElement('li');
        liElement.classList.add('category-item');
        liElement.innerHTML  = `<i class="tiny material-icons">crop_square</i> ${category}`
        categoryContainer.appendChild(liElement);
       


    });
    // clearElement(categoryContainer);
}


console.log("Opotoyi")

render();