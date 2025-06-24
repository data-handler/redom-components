import { el } from "redom";
import Option from '../Option';

export default class OptionGroup {
    constructor({ label, options = [] }) {
        this.el = el('optgroup', { label }, options.map(opt => {
            if (opt instanceof Option) return opt.el;
            if (typeof opt === 'string') return new Option({ label: opt, value: opt });
            return new Option(opt);
        }));
    }
}