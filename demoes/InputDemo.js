import { el, mount } from 'redom';
import { Input, LabelPosition, RadioGroup } from '../components/index.js';
import { icon } from '../utility.js';

const codeString = `import { el } from 'redom';
import { Input } from 'redom-components';

export default class {
    constructor() {
        this.input = new Input({
            name: 'example',
            label: 'Your name',
            placeholder: 'Enter your name',
            className: 'mb-3'
        });
    }

    onmount = () => {
        this.input.addEventListener('input', this.updateOutput);
    }

    updateOutput = () => {
        console.log(this.input.value);
    }

    onunmount = () => {
        this.input.removeEventListener('input', this.updateOutput);
    }
}`;


export default class InputDemo {
    constructor() {
        this.input = new Input({
            name: 'example',
            label: 'Your name',
            placeholder: 'Enter your name',
            labelPosition: LabelPosition.BEFORE,
            className: 'mb-3'
        });

        this.positionSelector = new RadioGroup({
            name: 'label-position',
            options: [
                { label: 'Before', value: LabelPosition.BEFORE, checked: true },
                { label: 'After', value: LabelPosition.AFTER }
            ],
            className: 'mb-2'
        });

        const labelPositionSection = el('',
            el('p.chapter', icon('align-vertical-distribute-start'), 'Label Position'),
            this.positionSelector
        );

        const inputSection = el('',
            el('pre',
                el('p.chapter', icon('component'), 'Component'),
                this.inputContainer = el('div', this.input)
            )
        );

        const outputSection = el('',
            el('pre',
                el('p.chapter', icon('activity'), 'Live Output'),
                el('code', this.valueElement = el('span', this.input.value || '(empty)'))
            )
        );

        const code = el('code', { class: 'language-javascript' });
        code.textContent = codeString;
        const codeSection = el('pre',
            el('p.chapter', icon('code'), 'Usage Example'),
            code
        );

        this.el = el('section',
            el('article',
                el('header', 'Input'),
                labelPositionSection,
                inputSection,
                outputSection,
                codeSection
            )
        );
    }

    onmount = () => {
        this.input.addEventListener('input', this.updateOutput);
        this.positionSelector.addEventListener('change', this.handleLabelChange);
    }

    handleLabelChange = () => {
        const pos = this.positionSelector.value;
        const currentValue = this.input.value;

        const newInput = new Input({
            name: 'example',
            label: 'Your name',
            placeholder: 'Enter your name',
            labelPosition: pos,
            className: 'mb-3',
            value: currentValue
        });

        newInput.addEventListener('input', this.updateOutput);
        mount(this.inputContainer, newInput, this.input, true);

        // Remove listener from old input
        this.input.removeEventListener('input', this.updateOutput);

        // Update ref
        this.input = newInput;
    }


    updateOutput = () => {
        const val = this.input.value;
        this.valueElement.textContent = val.length ? val : '(empty)';
    }

    onunmount = () => {
        this.input.removeEventListener('input', this.updateOutput);
        this.positionSelector.removeEventListener('change', this.handleLabelChange);
    }
}
