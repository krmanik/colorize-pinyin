# Colorize Pinyin

A JavaScript library for colorizing Pinyin text with HTML markup. Suitable for both browser and Node.js environments.
It is port of [colorize_pinyin](https://github.com/ratijas/colorize_pinyin) Python project.

## Installation

Install the library using npm:

```bash
npm install colorize-pinyin
```

## Usage

### In Browser

Include the library in your HTML file:

```html
<script src="node_modules/colorize-pinyin/dist/colorize-pinyin.min.js"></script>

<div id="pinyinText">
    bié de
</div>

<script>
    const pinyinText = document.getElementById("pinyinText");
    const colorizedHTML = colorizePinyin().colorized_HTML_string_from_string(pinyinText.innerText);
                                    // ^^^^ Note: It is method, not class.
    pinyinText.innerHTML = colorizedHTML;
</script>
```

### In Node.js

```javascript
const colorizePinyin = require("colorize-pinyin");

const pinyinText = "bié de";
const colorizedHTML = colorizePinyin().colorized_HTML_string_from_string(pinyinText);
                                // ^^^^ Note: it is method, not class.
console.log(colorizedHTML);
```

## API

### `colorized_HTML_string_from_string(text, pinyin_wrapper_class, tones_classes)`

- `text` (string): The input text containing Pinyin.
- `pinyin_wrapper_class` (string, optional): CSS class for the wrapper element (default: 'pinYinWrapper').
- `tones_classes` (array of strings, optional): CSS classes for different Pinyin tones (default: ["t0", "t1", "t2", "t3", "t4"]).

Returns a colorized HTML string with Pinyin.

### `lowercase_string_by_removing_pinyin_tones(s)`

- `s` (string): The input string with Pinyin tones.

Returns a lowercase string with removed Pinyin tones.

## License

[Do What the Fuck You Want To Public License](https://en.wikipedia.org/wiki/WTFPL)
