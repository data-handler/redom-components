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

    get hasValue() {
        return this.el.value.trim().length > 0;
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

    get name() {
        return this.el.name;
    }

    get validity() {
        return this.el.validity;
    }

    checkValidity() {
        return this.el.checkValidity();
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

    reset({ full = true } = {}) {
        this.value = '';
        this.ariaInvalid = null;
        if (full) {
            this.disabled = false;
            this.readOnly = false;
        }
    }


    focus() {
        this.el.focus();
    }

    select() {
        this.el.select();
    }

    addEventListener(...args) {
        this.el.addEventListener(...args);
    }

    removeEventListener(...args) {
        this.el.removeEventListener(...args);
    }
}
