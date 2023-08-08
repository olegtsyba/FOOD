
import { close,open } from "./modal";
import { postData } from "./services/services";

function forms (formSelector,modalTimerId) {
   //Forms

   const forms = document.querySelectorAll(formSelector);
   const massage = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо мы с вами свяжемся ',
      failure: 'Что-то пошло не так.... '

   };

   forms.forEach(item => {
      bindPostData(item);
   })




   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = massage.loading;
         statusMessage.style.cssText = `
         display:block;
         margin:0 auto;`
         //form.append(statusMessage);
         form.insertAdjacentElement('afterend', statusMessage);
         // Проеброзование формы json
         const formData = new FormData(form);
         const json = JSON.stringify(Object.fromEntries(formData.entries()));


         postData('  http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(massage.success);

               statusMessage.remove();
            }).catch(() => {
               showThanksModal(massage.failure);
            }).finally(() => {
               form.reset();
            })
         //const json = JSON.stringify(object);

         //const request = new XMLHttpRequest();
         //request.open('POST', 'server.php');
         //request.setRequestHeader('Content-type', 'multipart/form-data');// Если XMLHttpRequest() + FormData то заголовки устанавливать н надо будет ошибка они уст автоматически 
         //request.setRequestHeader('Content-type', 'application/json');

         /* ; */


         //request.send(formData);
         //request.send(json);

         /*   request.addEventListener('load', () => {
         if (request.status === 200) {
               console.log(request.response);
               showThanksModal(massage.success);
               form.reset();
               statusMessage.remove();
            } else {
               showThanksModal(massage.failure);
            }
           }); */
      });
   }
   // Form pretty

   function showThanksModal(massage) {

      const prevModalDialog = document.querySelector('.modal__dialog');
      prevModalDialog.classList.add('hide');
      open('.modal',modalTimerId);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class = 'modal__content'>
         <div class="modal__close" data-close>×</div>
         <div class="modal__title">${massage}</div>
      </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         close('.modal');
      }, 4000);

   }

}

//module.exports = forms;
export default forms;