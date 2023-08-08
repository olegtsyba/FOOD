function calc () {
   const result = document.querySelector('.calculating__result span');

   let sex,
   height,
   weight,
   age,
   ratio ;

   if(localStorage.getItem('sex')){
      sex = localStorage.getItem('sex')
   }else {
      sex = 'famale';
      localStorage.setItem('sex','famale')
   }

   if(localStorage.getItem('ratio')){
      ratio = localStorage.getItem('ratio')
   }else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375)
   }


   function initLocalSettings (Selector, activeClass) {   // Функция кстановки класса активности в соответствии с параметрами в localStorage
      const elements = document.querySelectorAll(`${Selector} div`);
      elements.forEach(item=>{
         item.classList.remove(activeClass)
         if( item.getAttribute('id') == localStorage.getItem('sex')){
            item.classList.add(activeClass);
         }
         if( item.getAttribute('data-ratio') == localStorage.getItem('ratio')){
            item.classList.add(activeClass);
         }

      })

   }
      initLocalSettings('#gender','calculating__choose-item_active');
      initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active')

   function calcTotal() { // Расчет колорий

      if( !sex ||!height||!weight||!age||!ratio) {
         result.textContent = '_____';
         return;
      }

      if(sex === 'female') {
         result.textContent =  Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      }else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }

   calcTotal(); 

   function getStaticInformation (parentSelector, activeClass) {
      const elements = document.querySelectorAll(`${parentSelector} div`);

      document.querySelector(parentSelector).addEventListener('click', (e)=> {
         if(e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute ('data-ratio');
            localStorage.setItem('ratio', +e.target.getAttribute ('data-ratio')); //Отправка  значения в локал сториж

         }else {
            sex = e.target.getAttribute('id');
            localStorage.setItem('sex', e.target.getAttribute ('id'));
         }

         
         console.log(ratio,sex);

         if(e.target.classList.contains('calculating__choose-item'||'calculating__choose-item')){
            elements.forEach(elem => {
               elem.classList.remove(activeClass);
         });
   
            e.target.classList.add(activeClass);
            calcTotal();
         }
         

      });
   }

      getStaticInformation('#gender','calculating__choose-item_active');
      getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

      function getDynamicInformation (selector){
         const input = document.querySelector(selector);


         input.addEventListener('input', ()=>{
            
            // Пров на измене инпут если у тнрут есть id которое ссответсвует необзод значению я єто значение присваєваю 
            
            if(input.value.match(/\D/g)){  //Проверка значения инпутта на соответствие подсветка при неккоректном вводе 
               input.style.border = ' 1px solid red';
            }else{
               input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
               case 'height':
                  height = +input.value;
                  break;
               case 'weight':
                  weight = +input.value;
                  break;
               case 'age':
                     age = +input.value;
                  break;     
            }
            calcTotal();
         });

      
      }

      getDynamicInformation('#height');
      getDynamicInformation('#weight');
      getDynamicInformation('#age');/*  */

}

//module.exports = calc;  //
export default calc;