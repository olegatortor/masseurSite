'use strict';





window.addEventListener('DOMContentLoaded', () => {
    const tabContents = document.querySelectorAll('.services__item'),
          tabsContainer = document.querySelector('.services__tabcontainer'),
          tabs = document.querySelectorAll('.services__tabitem');

          

    function hideTabContent() {
        tabContents.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showTabContent(i = 0) {
        tabContents[i].classList.remove('hide');
        tabContents[i].classList.add('show', 'fade');

        tabs[i].classList.add('active');
    }

    hideTabContent();
    showTabContent();

    tabsContainer.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if(target.classList.contains('services__tabitem') && target) {
            tabs.forEach((item, i) => {
                if(item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });





    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) { 
                days = 0,
                hours = 0,
                minutes = 0,
                seconds = 0;
        } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor(t / (1000 * 60 * 60) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function addZero(item) {
        if(item < 10) {
            return `0${item}`
        } else {
            return item;
        }
    }

    function setClocks(selector, deadline) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(deadline);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if(t.total === 0) {
                clearInterval(updateClock)
            }
        }
    }   

    setClocks('.signup__timer', new Date(2023, 7, 10));





    function hideModal(modalSelector) {
        const i = document.querySelector(modalSelector);

        i.classList.add('hide');
        i.classList.remove('show', 'fade');
        document.body.style.overflow = '';
    }

    function showModal(modalSelector, modalStart) {
        const i = document.querySelector(modalSelector);

        i.classList.remove('hide');
        i.classList.add('show', 'fade');
        document.body.style.overflow = 'hidden';

        if (modalStart) {
            clearInterval(modalStart);
        }
    }

    function modal(modalSelector, modalOpen) {
        const modal = document.querySelector(modalSelector),
              modalBtn = document.querySelectorAll(modalOpen);

        
        const modalStart = setTimeout(() => showModal(modalSelector), 5000);

        modalBtn.forEach(item => {
            item.addEventListener('click', () => {
                showModal(modalSelector)
            })
        })
    
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                hideModal(modalSelector)
            }
        })
    
        document.addEventListener('keydown', (e) => {
            if(e.code == 'Escape' && modal.classList.contains('show')) {
                hideModal(modalSelector)
            }
        })

        function showByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
                showModal(modalSelector, modalStart);
                window.removeEventListener('scroll', showByScroll);
            }
        }

        window.addEventListener('scroll', showByScroll);
    }

    modal('.modal', '[data-open]')




    const human = document.querySelectorAll('[data-human]'),
          totalPrice = document.querySelector('.signup__price span'),
          head = document.querySelector('.signup_head'),
          body = document.querySelector('.signup_body'),
          arms = document.querySelector('.signup_arms'),
          legs = document.querySelector('.signup_legs');
    let total = 0;

    function tooglePart(){
        human.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('interactive-active');
                if(item.classList.contains('interactive-active')) {
                    createTotal(item, 'plus');
                } else {
                    createTotal(item, 'minus');
                }
            })
        })
    }
    tooglePart();

    function createTotal(item, operator) {
        const arg = operator === 'plus' ? [50, 150]: [-50, -150];

        item.classList.forEach((className) => {
            switch (className) {
                case 'head':
                    total += arg[0];
                    showContent(head);
                    break;
                case 'body':
                    total += arg[1];
                    showContent(body);
                    break;
                case 'arms':
                    total += arg[0];
                    showContent(arms);
                    break;
                case 'legs':
                    total += arg[1];
                    showContent(legs);
                    break;
                default:
                    break;
            }
        });
        pushTotal(total)
    }

    function showContent(el) {
        el.classList.toggle('signup__show');
    }

    function pushTotal(total = 0) {
        totalPrice.textContent = `${total}`
    }
    pushTotal(total)
})
