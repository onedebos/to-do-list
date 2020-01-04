import renderCategories from '../views/catView'


const grabCatInput = (() => {
    const catInputForm = document.querySelector(".new-cat-form");
    const addCatBtn = document.querySelector(".add-cat");

    catInputForm.addEventListener("submit", event => {
      event.preventDefault();
      renderCategories.renderCatTwice();
    });
  
    addCatBtn.addEventListener("click", e => {
      e.preventDefault();
      renderCategories.renderCatTwice();
    });
  })();
  
  export default grabCatInput;