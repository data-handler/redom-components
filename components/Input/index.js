import { el } from 'redom';

export default class Input {
    constructor(attrs = {}) {
        this.el = el('input', { type: 'text', ...attrs });
    }

    get value() {
        return this.el.value;
    }

    set value(val) {
        this.el.value = val;
    }

    get disabled() {
        return this.el.disabled;
    }

    /**
     * @param {Boolean} val
     */
    set disabled(val) {
        this.el.disabled = val;
    }

    get readOnly() {
        return this.el.readOnly;
    }

    /**
     * @param {Boolean} val
     */
    set readOnly(val) {
        this.el.readOnly = val;
    }

    /**
     * @param {Boolean} val
     */
    set ariaInvalid(val) {
        if (val) {
            this.el.setAttribute('aria-invalid', 'true');
        } else {
            this.el.removeAttribute('aria-invalid');
        }
    }

    reset() {
        this.el.value = '';
        this.el.removeAttribute('aria-invalid'); // optional: reset validation state
    }

    focus() {
        this.el.focus();
    }

    addEventListener(...args) {
        this.el.addEventListener(...args);
    }

    removeEventListener(...args) {
        this.el.removeEventListener(...args);
    }
}
