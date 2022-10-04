"use strict"

import * as usefulFunctions from "./components/functions.js"; // Полезные функции
import maskInput from './forms/input-mask.js'; // Маска ввода для форм
import Swiper, {Autoplay, Navigation} from 'swiper';
import Quantity from './forms/quantity.js';  // Мобильное меню
import {WebpMachine} from "webp-hero"

// Проверка поддержки webp
usefulFunctions.isWebp();

// Добавление класса после загрузки страницы
usefulFunctions.addLoadedClass();

// Добавление класса touch для для мобильных
usefulFunctions.addTouchClass()

// Mobile 100vh
usefulFunctions.fullVHfix();

// IE Webp Support
const webpMachine = new WebpMachine();
webpMachine.polyfillDocument();

// Маска для ввода номера телефона
maskInput('input[name="phone"]',{
    masked: '+7 (___) ___-__-__'
});

// Input number
Quantity();



// Карточка товара
if(document.querySelector('[data-item]')){
    document.addEventListener('click', (event) => {
        if(event.target.closest('[data-item]')) {

            document.querySelector('.root').classList.add('product-view-open')
        }
        else       if(event.target.closest('[data-product-close]')) {

            document.querySelector('.root').classList.remove('product-view-open')
        }
    })
}

// Sliders
function initSliders() {
    // Перечень слайдеров

    if(document.querySelector('[data-section-nav]')) {
        const navSection =  new Swiper('[data-section-nav]', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 8,
            speed: 800,
            simulateTouch: true,
            freeMode: true,
            watchSlidesProgress: true,
        });

        document.addEventListener('click', (event) => {
            if(event.target.closest('[data-nav]')) {
                const item = event.target.closest('[data-nav]')
                const itemsArray = document.querySelectorAll('[data-nav]')
                const section = document.querySelector(`[data-section="${parseInt(item.dataset.nav)}"]`)

                itemsArray.forEach(elem => {
                    elem.classList.remove('active')
                });
                item.classList.add('active')

                window.scroll({
                    top: section.offsetTop - 106,
                    left: 0,
                    behavior: 'smooth'
                });

            }
        });

        function isOnVisibleSpace(element) {
            let bodyHeight = window.innerHeight;
            let elemRect = element.getBoundingClientRect();
            let offset   = elemRect.top;// - bodyRect.top;
            if (offset < 0) return false;
            if (offset > bodyHeight) return false;
            return true;
        }

        // Navigation
        (() => {
            const sections = document.querySelectorAll('[data-section]')
            const header = document.querySelector('.header')
            const content = document.querySelector('.main')
            const navsArray = document.querySelectorAll('[data-nav]')
            const headerHeight = header.offsetHeight

            console.log(sections);
            console.log(headerHeight);

            window.addEventListener('scroll', (event) => {

                sections.forEach(elem => {
                    let isVisible = isOnVisibleSpace(elem)
                    if(isVisible) {
                        let sectionNum = parseInt(elem.dataset.section)
                        navsArray.forEach(el => {
                            el.classList.remove('active')
                        });
                        document.querySelector(`[data-nav="${sectionNum}"]`).classList.add('active');
                        navSection.slideToLoop(sectionNum, 600)
                    }
                })
            })
        })();
    }
}

window.addEventListener("load", function (e) {
    // Запуск инициализации слайдеров
    initSliders();
});

