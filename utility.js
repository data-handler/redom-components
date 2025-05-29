import { el } from "redom";

export function icon(name, attrs = {}) {
    return el('i', { 'data-lucide': name, 'aria-hidden': true, ...attrs });
}

export function createLabelLayout(input, labelText, position = 'after', id = null) {
    const labelEl = labelText
        ? el('label', id ? { for: id } : {}, labelText)
        : null;

    switch (position) {
        case 'before':
            return [labelEl, input];
        case 'wrap':
            return [el('label', input, labelText)];
        case 'after':
        default:
            return [input, labelEl];
    }
}
