import { el } from 'redom';
import Option from '../Option'

export default class Select {
    constructor(attrs = {}, options = []) {
        this.el = el('select', { ...attrs },
            options.map(opt => {
                if (opt instanceof Option) return opt;
                if (typeof opt === 'string') return new Option({ label: opt, value: opt });
                return new Option(opt);
            }).map(opt => opt.el)
        );
    }

    get value() {
        return this.el.value;
    }

    set value(val) {
        this.el.value = val;
    }

    reset() {
        this.el.selectedIndex = 0;
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
