import { el, mount, unmount } from 'redom';
import RadioGroup from '../RadioGroup';
import './index.css';
import { LabelPosition } from '../constants';


export default class CollapsibleRadioGroup {
    constructor({
        name,
        label = '',
        options = [],
        content,
        required = false,
        className = '',
        invertTriggerValue = false,
        labelPosition = LabelPosition.WRAP
    }) {
        this.name = name;
        this.content = content;
        this.invertTriggerValue = invertTriggerValue;

        this.radioGroup = new RadioGroup({
            name,
            required,
            options,
            labelPosition,
            className
        });

        this.body = el('.collapsible-body',
            this.container = el('.content')
        );

        this.el = el('.input-container',
            this.header = el('.collapsible-header',
                this.radioGroup
            ),
            this.body,
            el('label', { htmlFor: `${name}-group` }, label)
        );
    }

    onmount = () => {
        this.radioGroup.addEventListener('change', this.onChange);
    }

    onunmount = () => {
        this.radioGroup.removeEventListener('change', this.onChange);
        this.reset();
    }

    onChange = () => {
        const isTrigger = this.invertTriggerValue
            ? this.value !== 'true'
            : this.value === 'true';

        if (isTrigger) {
            this.showContent();
        } else {
            this.hideContent();
        }

        this.el.dispatchEvent(new CustomEvent('change', { detail: this.value }));
    }

    showContent() {
        mount(this.container, this.content);
        this.body.style.maxHeight = '10000px';
    }

    hideContent() {
        this.body.style.maxHeight = null;
        unmount(this.container, this.content);
    }

    reset() {
        this.radioGroup.reset();
        this.hideContent();
    }

    addEventListener(...args) {
        this.el.addEventListener(...args);
    }

    removeEventListener(...args) {
        this.el.removeEventListener(...args);
    }

    get value() {
        return this.radioGroup.value;
    }

    set value(val) {
        this.radioGroup.value = val;
        this.onChange();
    }

    get disabled() {
        return this.radioGroup.disabled;
    }

    set disabled(val) {
        this.radioGroup.disabled = val;
    }
}
