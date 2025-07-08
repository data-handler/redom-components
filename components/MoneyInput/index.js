import { el } from "redom";

export class MoneyInput {
    constructor({ name = "amount", placeholder = "0.00", decimals = 2 } = {}) {
        this.decimals = decimals;
        this.el = el("input", {
            type: "text",
            inputmode: "decimal",
            pattern: `^\\d{1,9}(\\.\\d{0,${decimals}})?$`,
            placeholder,
            name,
            autocomplete: "off",
            "aria-label": name
        });
        this.onInput = this.onInput.bind(this);   // bind once
    }

    /* ── lifecycle ───────────────────────────── */
    onmount = () => this.el.addEventListener("input", this.onInput);
    onunmount = () => this.el.removeEventListener("input", this.onInput);

    /* ── input sanitiser ─────────────────────── */
    onInput() {
        this.el.value = this.el.value
            .replace(/[^0-9.]/g, "")            // digits or dot only
            .replace(/^0+(?!\.)/, "0")          // trim leading zeros
            .replace(/(\\..*?)\\..*/g, "$1")    // single dot
            .replace(new RegExp(`^(\\d+\\.\\d{${this.decimals}}).*`), "$1"); // max decimals
    }

    /* ── helpers ─────────────────────────────── */
    get value() { return this.el.value; }
    set value(v) { this.el.value = v ?? ""; }
    set ariaInvalid(v) { this.el.setAttribute("aria-invalid", v ? "true" : "false"); }

    validate() {
        const re = new RegExp(`^\\d+(\\.\\d{1,${this.decimals}})?$`);
        return re.test(this.el.value) && parseFloat(this.el.value) > 0;
    }

    focus() { this.el.focus(); }
}
