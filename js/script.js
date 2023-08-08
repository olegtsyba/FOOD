
import   tabs  from'./modules/tabs';
import   modal from'./modules/modal';
import   timer from'./modules/timer';
import   cards from'./modules/cards';
import   calc  from'./modules/calc';
import   forms from'./modules/forms';
import   slider from'./modules/slider';
import { open } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
   //CommonJS
   /* const tabs = require('./modules/tabs'), 
         modal = require('./modules/modal'),
         timer = require('./modules/timer'),
         cards = require('./modules/cards'),
         calc = require('./modules/calc'),
         forms = require('./modules/forms'),
         slider = require('./modules/slider');

   tabs();
   modal();
   timer();
   cards();
   calc();
   forms();
   slider(); */

   //ES6

      const modalTimerId = setTimeout(()=> open('.modal', modalTimerId), 50000);

      tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
      modal('[data-modal]','.modal', modalTimerId);
      timer('.timer','2023-09-15');
      cards();
      calc();
      forms('form', modalTimerId);
      slider({
            container: '.offer__slider',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            slide: '.offer__slide',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            fieled: '.offer__slider-inner'
            
      });

});
``