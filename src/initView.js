const renderInitView = (() =>{
    const bodyEl = document.querySelector('.doc-body');
    const bodyTemplate= '';
    bodyTemplate.innerHTML = `<section class="row">
    <section class="col s12 m4 l5">
      <div class="container">
        <div class="category-list">
          <div class="projects-title">
            <h3>Create a list here to start</h3>
          </div>
          <ul class="todo-categories" data-categories></ul>
          <form data-new-cat-form class="new-cat-form">
            <input
              id="category"
              type="text"
              data-new-cat-input
              placeholder=" Click here to create a new list"
            />
          </form>
          <a
            class="waves-effect waves-light btn-small del-cat"
            data-delete-cat-btn
            ><i class="material-icons left">delete_sweep</i>Delete</a
          >
          <a
            class="btn-floating btn-medium waves-effect waves-light green add-cat"
            ><i class="material-icons">add</i></a
          >
        </div>
      </div>
    </section>

    <section class="col s12 m8 l7">
      <!-- Note that "m8 l9" was added -->

      <div class="todos" data-list-display-container>
        <div class="todo-list-title">
          <h3 class="heading todo-title" data-list-title>No todos created</h3>
        </div>

        <div class="todo-list">
          <ul class="collapsible">
            
          </ul>
        </div>
      </div>

      <section class="todo-form">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s6" >
              <input placeholder="enter a title" onfocus = "this.value = ''"
                id="todo-title"
                type="text"
                class="validate"
                data-list-title
             />
              <label for="title">Title</label>
            </div>
            <div class="input-field col s6" >
              <input id="description" type="text" class="validate" onfocus = "this.value = ''" data-list-description />
              <label for="description" >Description</label>
            </div>
            <div class="input-field col s6" >
              <input id="due-date" type="date" class="validate" data-list-date/>
              <label for="due-date" >Due date</label>
            </div>
            <div class="input-field col s6" data-list-priority>
              <select data-selected-todo-option >
                <option value="" selected>Choose your option</option>
                <option value="1">High</option>
                <option value="2">Low</option>
              </select>
              <label>Priority</label>
            </div>
          </div>
        </div>

        <button
          class="btn waves-effect waves-light grab-todo"
          type="submit"
          name="action"
        >
          Submit
          <i class="material-icons right">send</i>
        </button>
      </section>
    </section>
  </section>
  `
  bodyEl.appendChild(bodyTemplate);
})();