import { el, mount, unmount } from 'redom';

export default class ConfirmationPopover {
    constructor(message, onConfirm) {
        this.el = el(
            '.confirm-popover',
            el('p', message),
            el(
                '.actions',
                (this.cancelBtn = el('button.secondary', 'No')),
                (this.confirmBtn = el('button.contrast', 'Yes'))
            )
        );

        this.onConfirm = onConfirm;

        this.cancelBtn.onclick = () => this.destroy();
        this.confirmBtn.onclick = () => {
            this.destroy();
            this.onConfirm?.();
        };

        this.handleOutsideClick = (e) => {
            if (!this.el.contains(e.target)) {
                this.destroy();
            }
        };
        setTimeout(() => document.addEventListener('click', this.handleOutsideClick), 0);
    }

    mountTo(target) {
        const wrapper = el('div', { style: 'position: relative; display: inline-block;' });
        target.after(wrapper);
        mount(wrapper, this);
        this.wrapper = wrapper;
    }

    destroy() {
        document.removeEventListener('click', this.handleOutsideClick);
        if (this.wrapper) unmount(this.wrapper, this);
    }
}
