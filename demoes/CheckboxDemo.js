import { el } from 'redom';
import { Checkbox, LabelPosition, RadioGroup } from '../components/index.js';
import { icon } from '../utility.js';

const codeString = `import { el } from 'redom';
import { Checkbox } from 'redom-components';

export default class {
    constructor() {
        this.checkbox = new Checkbox({ name: 'test', label: 'Test', className: 'mb-3' });
    }

    onmount = () => {
        this.checkbox.addEventListener('change', this.updateOutput);
    }

    updateOutput = () => {
        console.log(this.checkbox.checked);
    }

    onunmount = () => {
        this.checkbox.removeEventListener('change', this.updateOutput);
    }
}`;

export default class CheckboxDemo {
    constructor() {
        const checkboxes = [
            this.oneCheckbox = new Checkbox({ name: 'one', label: 'One', className: 'mb-3', checked: true }),
            this.twoCheckbox = new Checkbox({ name: 'two', label: 'Two', className: 'mb-3', checked: true }),
            this.threeCheckbox = new Checkbox({ name: 'three', label: 'Three', className: 'mb-3', checked: true })
        ];

        this.positionSelector = new RadioGroup({
            name: 'label-position',
            labelPosition: LabelPosition.AFTER,
            options: [
                { label: 'Before', value: LabelPosition.BEFORE },
                { label: 'After', value: LabelPosition.AFTER, checked: true },
                { label: 'Wrap', value: LabelPosition.WRAP }
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
                el('code', checkboxes))
        );

        const code = el('code', { class: 'language-javascript' });
        code.textContent = codeString;
        const codeSection = el('pre', el('p.chapter', icon('code'), 'Usage Example'), code);

        this.el = el('section',
            el('article',
                el('header', 'Checkbox'),
                labelPositionSection,
                inputSection,
                codeSection
            )
        );
    }

    onmount = () => {
        // this.checkbox.addEventListener('change', this.updateOutput);
        this.positionSelector.addEventListener('change', this.handleLabelChange);
    }

    handleLabelChange = () => {
        const pos = this.positionSelector.value;

        const checkboxRefs = [
            { key: 'oneCheckbox', old: this.oneCheckbox },
            { key: 'twoCheckbox', old: this.twoCheckbox },
            { key: 'threeCheckbox', old: this.threeCheckbox }
        ];

        checkboxRefs.forEach(({ key, old }) => {
            const name = old.input.name;
            const label = old.el.textContent.trim();
            const isChecked = old.checked;

            const newCheckbox = new Checkbox({
                name,
                label,
                checked: isChecked,
                className: 'mb-3',
                labelPosition: pos
            });

            old.el.replaceWith(newCheckbox.el);
            this[key] = newCheckbox;
        });
    };


    updateOutput = () => {
        this.valueElement.textContent = this.checkbox.checked;
    }

    onunmount = () => {
        // this.checkbox.removeEventListener('change', this.updateOutput);
        this.positionSelector.removeEventListener('change', this.handleLabelChange);
    }
}
