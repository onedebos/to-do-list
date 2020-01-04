const ToDoModel = (() =>{
    const todoItems = (title, description, dueDate, priority) => {
       return {title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        id: Date.now()} 
      }

      return {todoItems};
})();
    


  export default ToDoModel;