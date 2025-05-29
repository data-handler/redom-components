import { el } from 'redom';
import { RadioGroup, LabelPosition } from '../components/index.js';
import { icon } from '../utility.js';

const codeString = `import { RadioGroup, LabelPosition } from 'redom-components';

const radioGroup = new RadioGroup({
    name: 'options',
    labelPosition: LabelPosition.WRAP,
    options: [
        { label: 'Yes', value: 'yes', checked: true },
        { label: 'No', value: 'no' },
        { label: 'Maybe', value: 'maybe' }
    ]
});`;

export default class RadioGroupDemo {
    constructor() {
        this.radioGroup = new RadioGroup({
            name: 'options',
            labelPosition: LabelPosition.WRAP,
            options: [
                { label: 'Yes', value: 'yes', checked: true },
                { label: 'No', value: 'no' },
                { label: 'Maybe', value: 'maybe' }
            ]
        });

        const inputSection = el('',
            el('pre',
                el('fieldset.mb-0',
                    el('legend', 'Select an option:'),
                    el('code', this.radioGroup)
                )
            )
        );

        const code = el('code', { class: 'language-javascript' });
        code.textContent = codeString;
        const codeSection = el('pre', el('p.chapter', icon('code')), code);

        this.el = el('section',
            el('h5', 'RadioGroup'),
            inputSection,
            codeSection
        );
    }
}
