const catModel = (() =>{
    const createCategory = (name) => ({ name, id: Date.now(), todos: [] });

    return {createCategory}

})();

export default catModel;