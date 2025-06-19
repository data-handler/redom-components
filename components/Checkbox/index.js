import { el } from 'redom';
import { LabelPosition } from '../constants.js';

export default class Checkbox {
    constructor({
        name,
        label = '',
        id = null,
        checked = false,
        disabled = false,
        labelPosition = LabelPosition.WRAP,
        className = ''
    } = {}) {
        const inputId = id || `chk-${Math.random().toString(36).slice(2, 8)}`;

        this.input = el('input', {
            type: 'checkbox',
            name,
            id: inputId,
            checked,
            disabled
        });

        if (labelPosition === LabelPosition.WRAP) {
            this.el = el('label', this.input, label);
        } else {
            const labelEl = el('label', { for: inputId }, label);

            this.el = [this.input, labelEl];
            // labelPosition === LabelPosition.BEFORE
            //     ? el('div', labelEl, this.input)
            //     : el('div', this.input, labelEl);
        }

        if (className) {
            this.input.classList.add(...className.trim().split(/\s+/));
        }
    }

    // Proxy methods
    addEventListener(...args) {
        this.input.addEventListener(...args);
    }

    removeEventListener(...args) {
        this.input.removeEventListener(...args);
    }

    onunmount = () => {
        this.input.checked = false;
    };

    get checked() {
        return this.input.checked;
    }

    set checked(val) {
        this.input.checked = Boolean(val);
    }

    get value() {
        return this.input.checked;
    }

    set value(val) {
        this.input.checked = Boolean(val);
    }

    get disabled() {
        return this.input.disabled;
    }

    set disabled(val) {
        this.input.disabled = val;
    }
}
