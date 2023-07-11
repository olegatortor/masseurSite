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
})
