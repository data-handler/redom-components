import { el } from 'redom';
import CheckboxDemo from './demoes/CheckboxDemo.js';
import RadioGroupDemo from './demoes/RadioGroupDemo.js';
import Prism from 'prismjs';
import { createIcons, icons } from 'lucide';
import InputDemo from './demoes/InputDemo.js';


export default class {
    constructor() {
        this.el = el('.app',
            new RadioGroupDemo(),
            el('hr'),
            // new InputDemo()
        );
    }

    onmount = () => {
        Prism.highlightAll();
        createIcons({ icons });
    };
}
