// ==UserScript==
// @name         Copy Vine Item Link and Tax Value to Clipboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy the tax value and link of a vine item to the clipboard when its button is clicked
// @match        https://www.amazon.com/vine/vine-items*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('click', function(e) {
        if (e.target.matches('.vvp-item-tile .a-button-input')) {
            const linkElement = e.target.closest('.vvp-item-tile').querySelector('a.a-link-normal');
            const linkHref = "https://www.amazon.com" + linkElement.getAttribute('href');

            // Observe changes in the DOM for the tax value span
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    const taxValue = mutation.target.textContent.trim();
                    if (mutation.type === 'childList' && taxValue !== "") {
                        // Remove the dollar sign from the beginning
                        let sanitizedTaxValue = taxValue.startsWith('$') ? taxValue.slice(1) : taxValue;
                        // Replace 0.00 with f
                        sanitizedTaxValue = sanitizedTaxValue === '0.00' ? 'f' : sanitizedTaxValue;
                        const textToCopy = sanitizedTaxValue + " " + linkHref;

                        const textArea = document.createElement('textarea');
                        textArea.value = textToCopy;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);

                        // Disconnect the observer after copying
                        observer.disconnect();
                    }
                });
            });

            const taxValueSpan = document.querySelector('#vvp-product-details-modal--tax-value-string');
            if (taxValueSpan) {
                observer.observe(taxValueSpan, { childList: true });
            }
        }
    });

})();
