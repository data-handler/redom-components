import { el } from 'redom';
import RadioGroup from '../RadioGroup';
import { LabelPosition } from '../constants.js';

export default class CollapsibleRadioGroup {
    constructor({
        name,
        label = '',
        content,
        defaultExpanded = false,
        labelPosition = LabelPosition.AFTER,
        options = [
            { label: 'Collapse', value: 'false' },
            { label: 'Expand', value: 'true' }
        ]
    }) {
        // auto-set checked based on defaultExpanded
        const radios = options.map((opt, i) => ({
            ...opt,
            checked: defaultExpanded
                ? i === 1  // second option checked if expanded
                : i === 0  // first option checked if collapsed
        }));

        this.radio = new RadioGroup({
            name,
            labelPosition,
            options: radios
        });

        this.body = el('.collapsible-body', content);
        this.header = el('.collapsible-header',
            el('label', label),
            this.radio
        );

        this.el = el('.collapsible', this.header, this.body);

        this.body.style.maxHeight = defaultExpanded ? '10000px' : null;
    }

    onmount = () => {
        this.radio.addEventListener('change', this.toggle);
    };
    onunmount = () => {
        this.radio.removeEventListener('change', this.toggle);
    };

    toggle = () => {
        const expanded = this.radio.value === 'yes';
        this.body.style.maxHeight = expanded ? '10000px' : null;
        this.el.dispatchEvent(new CustomEvent('toggle', {
            bubbles: true,
            detail: { expanded }
        }));
    };

    get expanded() {
        return this.radio.value === 'yes';
    }
    set expanded(val) {
        this.radio.value = val ? 'yes' : 'no';
        this.toggle();
    }

    addEventListener(...a) { this.el.addEventListener(...a); }
    removeEventListener(...a) { this.el.removeEventListener(...a); }
    dispatchEvent(...a) { return this.el.dispatchEvent(...a); }
}
