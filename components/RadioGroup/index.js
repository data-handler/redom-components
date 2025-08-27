import { el } from 'redom';
import { LabelPosition } from '../constants';

export default class RadopGroup {
    constructor({
        name,
        required = false,
        options = [],
        className = '',
        disabled = false,
        labelPosition = LabelPosition.WRAP
    }) {

        if (!Object.values(LabelPosition).includes(labelPosition)) {
            throw new Error(`Invalid label position: ${labelPosition}`);
        }

        this.inputs = [];

        this.el = el('', ...this.buildOptions({
            name,
            options,
            required,
            disabled,
            labelPosition
        }));

        if (className) {
            this.el.classList.add(...className.trim().split(/\s+/));
        }
    }

    buildOptions({ name, options, required, disabled, labelPosition }) {
        return options.flatMap(({ label, value, checked }) => {
            const input = el('input', {
                type: 'radio',
                name,
                required,
                value,
                disabled,
                checked,
                id: `${name}-${value}`
            });

            this.inputs.push(input);

            if (labelPosition === 'wrap') {
                return el('label', input, label);
            }

            const labelEl = el('label', { htmlFor: input.id }, label);
            return labelPosition === 'before'
                ? [labelEl, input]
                : [input, labelEl];
        });
    }

    // Proxy native methods
    addEventListener(...args) {
        this.el.addEventListener(...args);
    }

    removeEventListener(...args) {
        this.el.removeEventListener(...args);
    }

    onunmount = () => {
        this.reset();
    }

    reset = () => {
        this.inputs.forEach(input => (input.checked = false));
    }

    get value() {
        const selected = this.inputs.find(input => input.checked);
        const val = selected ? selected.value : null;
        return val;
    }

    set value(val) {
        const target = this.inputs.find(input => input.value == val);
        if (target) {
            target.checked = true;
            // Uncheck others
            this.inputs.forEach(input => {
                if (input !== target) input.checked = false;
            });
        }
    }

    get disabled() {
        return this.inputs.every(input => input.disabled);
    }

    set disabled(val) {
        this.inputs.forEach(input => {
            input.disabled = val;
        });
    }
}
