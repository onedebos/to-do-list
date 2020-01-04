
const index = require("../index");

const storage = (() =>{

    const saveToLocalStorage = () => {
        localStorage.setItem(index.LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(index.categories));
        localStorage.setItem(index.LOCAL_STORAGE_SELECTED_CAT_ID_KEY, index.selectedCatId);
      };

return {saveToLocalStorage}
})();

export default storage;