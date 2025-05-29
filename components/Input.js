import { el } from 'redom';
import { LabelPosition } from './constants.js';
import { createLabelLayout } from '../utility.js';

export default class Input {
    constructor({
        name,
        label = '',
        id = null,
        type = 'text',
        placeholder = '',
        required = false,
        readOnly = false,
        disabled = false,
        value = '',
        autocomplete = 'off',
        maxlength = null,
        className = '',
        labelPosition = LabelPosition.BEFORE
    }) {
        this.input = el('input', {
            type,
            name,
            id: id || `${name}-input`,
            required,
            readOnly,
            disabled,
            placeholder,
            autocomplete,
            maxlength,
            value,
            oninput: this.handleInput
        });

        this.el = el('div.input-container',
            ...createLabelLayout(this.input, label, labelPosition, this.input.id)
        );

        if (className) {
            this.el.classList.add(...className.trim().split(/\s+/));
        }
    }

    handleInput = (e) => {
        if (e.target.value?.length) {
            this.el.classList.remove('error');
        }
    };

    onunmount = () => {
        this.input.value = '';
    };

    // DOM proxy methods
    addEventListener(...args) {
        this.el.addEventListener(...args);
    }

    removeEventListener(...args) {
        this.el.removeEventListener(...args);
    }

    focus() {
        this.input.focus();
    }

    reset() {
        this.input.value = '';
        this.el.classList.remove('error');
    }

    get value() {
        return this.input.value || '';
    }

    set value(val) {
        this.input.value = val ?? '';
    }

    set displayError(show) {
        this.el.classList.toggle('error', show);
        if (show) this.focus();
    }

    get disabled() {
        return this.input.disabled;
    }

    set disabled(val) {
        this.input.disabled = val;
    }
}
