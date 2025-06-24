import { el } from 'redom';

export default class Option {
    constructor({ label, value, disabled = false, selected = false } = {}) {
        this.el = el('option', {
            value,
            disabled,
            selected
        }, label);
    }

    get value() {
        return this.el.value;
    }

    set value(val) {
        this.el.value = val;
    }

    get selected() {
        return this.el.selected;
    }

    set selected(val) {
        this.el.selected = val;
    }
}
