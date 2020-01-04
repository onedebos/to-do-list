import M from 'materialize-css';


const sharedViews = (() => {
    const clearElement = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  const displayErrorMessage = (message) =>{
    M.toast({ html: message }, 1000);
}

  

  return {clearElement, displayErrorMessage};
})();

export default sharedViews;