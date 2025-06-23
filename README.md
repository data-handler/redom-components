# redom-components

Lightweight UI components built with [RE:DOM](https://redom.js.org/), designed for flexibility and composability.

## Installation

```bash
npm install redom-components
```

## Usage

```js
import { Input } from "redom-components";

const input = new Input({ name: "email", type: "email", placeholder: "Enter your email" });
```

## Components

- `Input` – Simple wrapper around an `<input>` element with helpful methods like `.value`, `.focus()`, `.reset()`, etc.
- `Checkbox` – Checkbox input with flexible label placement (wrap or side-by-side).
- `RadioGroup` – Grouped radio buttons with support for custom label layout.
- `CollapsibleRadioGroup` – A yes/no radio group that conditionally reveals content when "Yes" (or optionally "No") is selected. Includes `.value`, `.reset()`, and event proxying.
- `LabelPosition` – Enum constants for label positioning:
  - `LabelPosition.BEFORE`
  - `LabelPosition.AFTER`
  - `LabelPosition.WRAP`

## License

ISC
