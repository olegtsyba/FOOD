function tabs (tabsSelector, tabsContentSelector,tabsParentSelector,activeClass){
   //Tabs
   const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      })
      tabs.forEach(item => {
         item.classList.remove(activeClass );
      })
   }

   function ShowTabsContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');

   }

   hideTabContent();
   ShowTabsContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) { // Сравневую что элемент на котором срабатывет событие совпадает с элементом в псевдомасиве

               hideTabContent();
               ShowTabsContent(i); // Ханошу сюда порядковый номер елемента который совпал 
            }
         })
      }
   });
}

//module.exports = tabs;
export default tabs;
