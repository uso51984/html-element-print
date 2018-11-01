# HTML Element Print

[demo](https://rpdasilva.github.io/print-html-element/)

## 安装

`npm install html-element-print`

## 使用

CommonJS 或者 es6引入方式
```js
  import htmlElementPrint from 'html-element-print';
```

原始引入方式
```html
    <script type="text/javascript" src="print-html-element.js"></script>
```
```js
    htmlElementPrint(element, options);
```
> element 支持 text html或者 dom对象.

### examples
```js
  const element = document.querySelector('#printElement');
  htmlElementPrint(element, {sourceType: 'dom'});
```

### Examples
View examples [here](https://rpdasilva.github.io/print-html-element/)

```js
    PHE.printElement( document.getElementById('toPrint') );
    PHE.printHtml('<h1>Let\'s print this h1</h1>');

    PHE.printHtml('<h1>Let\'s print this h1</h1>', {templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>'});
```
