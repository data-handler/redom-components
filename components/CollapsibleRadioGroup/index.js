import { el } from 'redom';
import RadioGroup from '../RadioGroup';
import { LabelPosition } from '../constants.js';

export default class CollapsibleRadioGroup {
    constructor({
        name,
        label = '',
        content,
        defaultExpanded = false,
        expandedValue = 'yes',
        labelPosition = LabelPosition.AFTER,
        options = [
            { label: 'Collapse', value: 'no' },
            { label: 'Expand', value: 'yes' }
        ]
    }) {
        // 1️⃣  ensure expandedValue is present
        const hasExpanded = options.some(o => o.value === expandedValue);
        if (!hasExpanded) {
            console.warn(
                `[CollapsibleRadioGroup] expandedValue "${expandedValue}" not found in options; using first option instead.`
            );
        }
        const realExpandedValue = hasExpanded ? expandedValue : options[0].value;

        // flag which option should be checked
        const radios = options.map(opt => ({
            ...opt,
            checked: defaultExpanded
                ? opt.value === realExpandedValue
                : opt.value !== realExpandedValue
        }));

        this.expandedValue = realExpandedValue;

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
