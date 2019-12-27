const todos = ( title, description, dueData, priority, id, category) =>{ 
  const getTitle = () => title;
  const getDescription =()  => description
  const getdueDate = () => dueData
  const getPriority = () => priority
  const getId = () => id
  const getCategory = () => category

  return {getTitle, getDescription, getdueDate, getPriority, getId, getCategory}
}


