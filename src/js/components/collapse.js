export default () => {
    const collapseControl = document.querySelectorAll('.collapse-control');

    collapseControl.forEach(el => {
        el.addEventListener('click', (e) => {
            const self = e.currentTarget.closest('.collapse');
            const control = self.querySelector('.collapse-control');
            const content = self.querySelector('.collapse-content');

            self.classList.toggle('open');

            if (self.classList.contains('open')) {
                control.setAttribute('aria-expanded', true);
                content.setAttribute('aria-hidden', false);
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                control.setAttribute('aria-expanded', false);
                content.setAttribute('aria-hidden', true);
                content.style.maxHeight = null;
            }
            return false;
        });
    });
};
