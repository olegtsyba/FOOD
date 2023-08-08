
function open(modalSelector,modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';
   console.log(modalTimerId);
   if(modalTimerId){
      clearInterval(modalTimerId);
   }
   
}

function close(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
}


function modal (trigerSelector,modalSelector,modalTimerId){
   //modal
   const openModal = document.querySelectorAll(trigerSelector),
      modal = document.querySelector(modalSelector);


   openModal.forEach(item => {
      item.addEventListener('click',()=> open(modalSelector,modalTimerId));
   })



   modal.addEventListener('click', (e) => {
      if (e.target == modal || e.target.getAttribute('data-close') == '') {
         close(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {// отработка клавитаьтуры 
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         close(modalSelector);
      }
   });

   // Modal timing



   function showModalByScroll() {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         open(modalSelector);
         //window.scrollY(получаем значения прокрутки ) + document.documentElement.clientHeight (получаеи значение высоты видимого элемента страницы)
         //document.documentElement.scrollHeight (получаеи значение всей высоты страницы(всей прокрутки))
         open(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll)
      }
   }

   window.addEventListener('scroll', showModalByScroll);
}

//module.exports = modal;
export default modal;
export{close};
export{open};