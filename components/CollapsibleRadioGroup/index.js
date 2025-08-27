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
            { label: 'No', value: 'no' },
            { label: 'Yes', value: 'yes' }
        ]
    }) {
        const hasExpanded = options.some(o => o.value === expandedValue);
        if (!hasExpanded) {
            console.warn(
                `[CollapsibleRadioGroup] expandedValue "${expandedValue}" not found in options; using first option instead.`
            );
        }
        const realExpandedValue = hasExpanded ? expandedValue : options[0].value;

        // flag which option should be checked
        const radios = options.map(opt => {
            const checked = defaultExpanded
                ? opt.value === realExpandedValue
                : opt.value !== realExpandedValue;
            return {
                ...opt,
                checked
            };
        });

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

        this.el = el('.collapsible-radio-group', this.header, this.body);
    }

    onmount = () => {
        this.radio.addEventListener('change', this.toggle);
        // Set initial maxHeight for correct state
        if (this.expanded) {
            this.body.style.maxHeight = this.body.scrollHeight + 'px';
        } else {
            this.body.style.maxHeight = '0px';
        }
    };

    onunmount = () => {
        this.radio.removeEventListener('change', this.toggle);
    };

    toggle = () => {
        // Smooth expand/collapse using scrollHeight
        if (this.expanded) {
            this.body.style.maxHeight = this.body.scrollHeight + 'px';
        } else {
            this.body.style.maxHeight = '0px';
        }
        this.el.dispatchEvent(new CustomEvent('toggle', {
            bubbles: true,
            detail: { expanded: this.expanded, value: this.radio.value }
        }));
    };

    get expanded() {
        const isExpanded = this.radio.value === this.expandedValue;
        return isExpanded;
    }

    set expanded(val) {
        this.radio.value = val ? this.expandedValue : 'no';
        this.toggle();
    }

    addEventListener(...a) { this.el.addEventListener(...a); }
    removeEventListener(...a) { this.el.removeEventListener(...a); }
    dispatchEvent(...a) { return this.el.dispatchEvent(...a); }

    get value() {
        return this.radio.value;
    }
}
