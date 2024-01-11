// ==UserScript==
// @name         Amazon Vine Extended Keybinds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Extended keybinds for Amazon Vine page functionality
// @match        https://www.amazon.com/vine/vine-items*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const navigateToPrevious = () => {
        const prevElement = document.querySelector('div.a-text-center[role="navigation"] ul.a-pagination li:not(.a-last) a');
        if (prevElement && prevElement.href) {
            window.location.href = prevElement.href;
        }
    };

    const navigateToNext = () => {
        const nextElement = document.querySelector('div.a-text-center[role="navigation"] ul.a-pagination li.a-last a');
        if (nextElement && nextElement.href) {
            window.location.href = nextElement.href;
        }
    };

    const triggerBack = () => {
        const backButton = document.querySelector('span.a-button-inner input[aria-labelledby="vvp-product-details-modal--back-btn-announce"]');
        if (backButton) {
            backButton.click();
        }
    };

    const triggerRequest = () => {
        const requestButton = document.querySelector('span.a-button-inner input[aria-labelledby="vvp-product-details-modal--request-btn-announce"]');
        if (requestButton) {
            requestButton.click();
        }
    };

    const selectSearchField = () => {
        const searchField = document.getElementById('vvp-search-text-input');
        if (searchField) {
            searchField.focus();
        }
    };

    const selectItemTile = (index) => {
        const itemTiles = document.querySelectorAll('#vvp-items-grid .vvp-item-tile');
        if (itemTiles && itemTiles[index]) {
            const itemButton = itemTiles[index].querySelector('.a-button-input');
            if (itemButton) {
                itemButton.click();
            }
        }
    };

    window.addEventListener('keydown', (e) => {
        const searchField = document.getElementById('vvp-search-text-input');
        if (document.activeElement === searchField) {
            return;
        }

        switch (e.key) {
            case 'a':
            case 'A':
                navigateToPrevious();
                break;
            case 'd':
            case 'D':
                navigateToNext();
                break;
            case 'Escape':
                triggerBack();
                break;
            case 'Enter':
                triggerRequest();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                selectSearchField();
                break;
            case 'q':
            case 'Q':
                window.location.href = "https://www.amazon.com/vine/vine-items?queue=potluck";
                break;
            case 'w':
            case 'W':
                window.location.href = "https://www.amazon.com/vine/vine-items?queue=last_chance";
                break;
            case 'e':
            case 'E':
                window.location.href = "https://www.amazon.com/vine/vine-items?queue=encore";
                break;
            case 's':
            case 'S':
                window.scrollTo(0, document.body.scrollHeight);
                break;
            case 'x':
            case 'X':
                window.scrollTo(0, 0);
                break;
            case '1':
                selectItemTile(0);
                break;
            case '2':
                selectItemTile(1);
                break;
            case '3':
                selectItemTile(2);
                break;
            case '4':
                selectItemTile(3);
                break;
            case '5':
                selectItemTile(4);
                break;
            case '6':
                selectItemTile(5);
                break;
            case '7':
                selectItemTile(6);
                break;
            case '8':
                selectItemTile(7);
                break;
            case '9':
                selectItemTile(8);
                break;
            case '0':
                selectItemTile(9);
                break;
            default:
                break;
        }
    });

})();
