import { el } from 'redom';
import Option from '../Option';
import OptionGroup from '../OptionGroup';

export default class Select {
    constructor(attrs = {}, options = []) {
        this.el = el('select', { ...attrs },
            options.map(opt => {
                if (opt instanceof Option || opt instanceof OptionGroup) {
                    return opt;
                }

                // Handle optgroup-like structure
                if (opt.label && Array.isArray(opt.options)) {
                    return new OptionGroup(opt);
                }

                // Handle simple string or object
                if (typeof opt === 'string') {
                    return new Option({ value: opt, label: opt });
                }

                return new Option(opt);
            })
        );
    }

    get value() {
        return this.el.value;
    }

    set value(val) {
        this.el.value = val;
    }

    reset(full = false) {
        if (full) {
            this.el.innerHTML = '';
        } else {
            this.el.selectedIndex = 0;
        }
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
