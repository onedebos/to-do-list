const uuidv4 = require("uuid/v4");

const ToDoModel = (() => {
  const todoItems = (title, description, dueDate, priority) => {
    return {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      id: uuidv4()
    };
  };

  return { todoItems };
})();

export default ToDoModel;
