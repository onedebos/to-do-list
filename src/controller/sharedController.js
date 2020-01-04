import M from 'materialize-css';

const sharedController = (() =>{
    
    document.addEventListener('DOMContentLoaded', () => {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);
      });
      
      document.addEventListener('DOMContentLoaded', () => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
      });
    
})();

export default sharedController;
  
  