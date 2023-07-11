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
})
