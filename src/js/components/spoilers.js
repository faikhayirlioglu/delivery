export default function() {

    const spoilersArray = document.querySelectorAll('[data-spoilers]');

    if (spoilersArray.length > 0) {

        const spoilerControl = document.querySelectorAll( '[data-spoiler-control]');

        spoilerControl.forEach(el => {
            el.addEventListener('click', (e) => {
                const spoilerGroup = e.currentTarget.closest('[data-spoilers]');
                const oneSpoiler = spoilerGroup.hasAttribute('data-one-spoilers');
                const spoilerItem = e.currentTarget.closest('[data-spoiler]');
                const spoilerIsOpen = spoilerItem.classList.contains('open');
                const spoilerContent = spoilerItem.querySelector('[data-spoiler-content]');
                const spoilerCount = spoilerGroup.querySelectorAll('[data-spoiler]');

                if (oneSpoiler) {
                    if (!spoilerIsOpen) {
                        spoilerCount.forEach(elem => {
                            elem.classList.remove('open');
                            elem.querySelector('[data-spoiler-control]').setAttribute('aria-hidden', true);
                            elem.querySelector('[data-spoiler-control]').setAttribute('aria-expanded', false);
                            elem.querySelector('[data-spoiler-content]').style.maxHeight = null;
                        });
                        spoilerItem.classList.toggle('open');
                    }
                }
                else {
                    spoilerItem.classList.toggle('open');
                }

                // если открыт аккордеон
                if (spoilerItem.classList.contains('open')) {
                    el.setAttribute('aria-expanded', true);
                    el.setAttribute('aria-hidden', false);
                    spoilerContent.style.maxHeight = spoilerContent.scrollHeight + 'px';
                } else {
                    el.setAttribute('aria-expanded', false);
                    el.setAttribute('aria-hidden', true);
                    spoilerContent.style.maxHeight = null;
                }
            });
        });
    }
}


