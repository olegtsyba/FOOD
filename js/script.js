document.addEventListener('DOMContentLoaded', () => {

   //Tabs

   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');
   
      function hideTabContent (){
         tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show','fade');
         })
         tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
         })
      }

      function ShowTabsContent (i=0) {
         tabsContent[i].classList.add('show','fade');
         tabsContent[i].classList.remove('hide');
         tabs[i].classList.add('tabheader__item_active');

      }

      hideTabContent();
      ShowTabsContent();

      tabsParent.addEventListener('click', (event)=>{
         const target = event.target;

         if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item,i)=>{
               if(target == item){ // Сравневую что элемент на котором срабатывет событие совпадает с элементом в псевдомасиве

                  hideTabContent();
                  ShowTabsContent(i);// Ханошу сюда порядковый номер елемента который совпал 
               }
            })
         }
      });

      //Timer

      const deadline = '2023-05-07';

      function gerTimeRemaining (endtime) {
         let days,hours,minutes,seconds;
         const t = Date.parse(endtime) - Date.parse(new Date());

         if(t <=0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds =0 ;
         }else {
               days = Math.floor(t/(1000 * 60 * 60 * 24)),//получаем кол-во мелесекунд в одном дне потом делим входящее кол*-во милсек на кол милсек одном дне 
               hours = Math.floor((t/(1000* 60* 60) % 24)),
               minutes = Math.floor((t/ 1000 / 60)%60),
               seconds = Math.floor((t/ 1000)%60);
         }


               
               return {
                  'total': t,
                  'days':days,
                  'hours': hours,
                  'minutes': minutes,
                  'seconds': seconds
               };
      }

      function getZero(num) {
         if(num >=0 && num < 10) {
            return `0${num}`
         }else {
            return num;
         }
      }

      function setClock (selector,endtime) {
         const timer = document.querySelector(selector),
               days = timer.querySelector('#days'),
               hours = timer.querySelector('#hours'),
               minutes = timer.querySelector('#minutes'),
               seconds = timer.querySelector('#seconds'),
               timeInterval = setInterval(updateClock,1000);

         updateClock();

         function updateClock () {
            const t = gerTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <=0){
               clearInterval(timeInterval);
            }
         } 

      }

      setClock('.timer', deadline);

      // Modal
      

      const openModal = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            closeModal = document.querySelector('[data-close]');
            openModal.forEach(item =>{
               item .addEventListener('click', open);
            })

            function open(){
               modal.classList.add('show');
               modal.classList.remove('hide');
               document.body.style.overflow = 'hidden';
               clearInterval(modalTimerId);
            }

            function close() {
               modal.classList.add('hide');
               modal.classList.remove('show');
               document.body.style.overflow = '';
            }

            closeModal.addEventListener('click',close)
      
            modal.addEventListener('click',(e)=>{
               if(e.target == modal){
                  close ();
               }
            });

            document.addEventListener('keydown', (e)=>{
               if(e.code === 'Escape'&& modal.classList.contains('show')){
                  close();
               }
            });

            // Modal timing

            //const  modalTimerId = setTimeout(open,3000);

            function showModalByScroll(){
               if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
                  open();
                  //window.scrollY(получаем значения прокрутки ) + document.documentElement.clientHeight (получаеи значение высоты видимого элемента страницы)
                  //document.documentElement.scrollHeight (получаеи значение всей высоты страницы(всей прокрутки))
                  window.removeEventListener('scroll', showModalByScroll)
               }
            }

            window.addEventListener('scroll', showModalByScroll);

            // Используем классы для карточек

            class MenuCard {
               constructor(src, alt, title, descr, price,parentSelector,...classes) {
                  this.scr = src;
                  this.alt = alt;
                  this.title = title;
                  this.descr = descr;
                  this.price = price;
                  this.classes = classes;
                  this.parent = document.querySelector(parentSelector);
                  this.transfer = 27;
                  this.changeToUAN();
               }

               changeToUAN () {
                  this.price = this.price * this.transfer;
               }

               render() {
                  const element = document.createElement('div');
                  if(this.classes.length === 0){
                     this.element = 'menu__item';
                     element.classList.add(this.element);
                  }else {
                     this.classes.forEach(className =>{
                        element.classList.add(className)
                     });
                  }
                  element.innerHTML = `
                  <img src=${this.scr} alt=${this.alt}>
                  <h3 class="menu__item-subtitle">${this.title}</h3>
                  <div class="menu__item-descr">${this.descr}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                  `; 
                  this.parent.append(element)
               }
               
            }

            //const div = new MenuCard()
            new MenuCard(
               "img/tabs/vegy.jpg",
               "vegy",
               'Меню "Фитнес"',
               'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
               9,
               '.menu .container',
               
            ).render();

            new MenuCard(
               "img/tabs/elite.jpg",
               "elite",
               'Меню “Премиум”',
               'В меню “Премиум”   мы используем не только красивый дизайн упаковки, но и  качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
               20,
               '.menu .container',
               "menu__item"
            ).render();

            new MenuCard(
               "img/tabs/post.jpg",
               "post",
               'Меню "Постное"',
               'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
               10,
               '.menu .container',
               "menu__item"
            ).render();

});