# HTML Element Print

[demo](https://uso.gitee.io/html-element-print/)

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

## examples
```js
  const element = document.querySelector('#printElement');
  htmlElementPrint(element, {sourceType: 'dom'});
```