
# remarkable-highlight-lines

## Install

```bash
yarn add remarkable-highlight-lines
```

## Usage

```js
const Remarkable = require('remarkable');
const highlightLines = require('remarkable-highlight-lines')

const md = new Remarkable();
md.use(highlightLines)

md.render(markdownString)
```

### Example 

To highlight line 1, and lines 3 through 5:

````markdown
```js {1,3-5}
function foo() {
  return bar()
    .then(res => {
      return res.doSomething()
    })
}
```
````

_Note that the spaces between language name and opening curly bracket are optional._

Each highlighted line will be wrapped in `<span class="highlighted-line"></span>`, you can apply some custom styles to this element, recommended:

```css
pre, pre[class*="language-"] {
  padding: 1.575rem;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 30px 0;
  color: white;
  overflow: auto;
}

.highlighted-line {
  background-color: #14161a;
  display: block;
  margin: 0 -1.575rem;
  padding: 0 1.575rem;
}
```

## Credits

Many thanks to [EGOIST](https://github.com/egoist) and the [markdown-it-highlight-lines repo](https://github.com/egoist/markdown-it-highlight-lines). [MIT](./LICENSE) License.