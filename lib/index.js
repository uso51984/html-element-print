'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var callPrint = function callPrint(printWindow, iframe) {
  if (printWindow && printWindow.printPage) {
    printWindow.printPage();
    if (iframe) {
      document.body.removeChild(iframe);
    }
  } else {
    setTimeout(function () {
      callPrint(printWindow, iframe);
    }, 50);
  }
};

var getBaseHref = function getBaseHref() {
  var port = window.location.port ? ':' + window.location.port : '';
  return window.location.protocol + '//' + window.location.hostname + port + window.location.pathname;
};

var getMarkup = function getMarkup(elementHtml, options) {
  var template = options.templateString;
  var templateRegex = new RegExp(/{{\s*printBody\s*}}/gi);
  var stylesheets = void 0;
  var styles = void 0;
  var html = [];

  if (template && templateRegex.test(template)) {
    elementHtml = template.replace(templateRegex, elementHtml);
  }

  html.push('<html><head><title>' + (options.pageTitle || '') + '</title>');

  // If stylesheet URL's or list of stylesheet URL's are specified, override page stylesheets
  if (options.stylesheets) {
    stylesheets = Array.isArray(options.stylesheets) ? options.stylesheets : [options.stylesheets];
  } else {
    stylesheets = Array.prototype.slice.call(document.getElementsByTagName('link')).map(function (link) {
      return link.href;
    });
  }

  stylesheets.forEach(function (href) {
    html.push('<link rel="stylesheet" href="' + href + '">');
  });

  // If inline styles or list of inline styles are specified, override inline styles
  if (options.styles) {
    styles = Array.isArray(options.styles) ? options.styles : [options.styles];
  } else {
    styles = Array.prototype.slice.call(document.getElementsByTagName('style')).map(function (style) {
      return style.innerHTML;
    });
  }

  styles.forEach(function (style) {
    html.push('<style type="text/css">' + style + '</style>');
  });

  html.push('<base href="' + getBaseHref() + '"/>');
  html.push('</head><body class="pe-body">');
  html.push(elementHtml);
  html.push('\n    <script type="text/javascript">\n      function printPage() {\n        focus();\n        print();\n        ' + (options.printMode.toLowerCase() == 'popup' ? 'close();' : '') + '\n      }\n    </script>\n  ');
  html.push('</body></html>');

  return html.join('');
};

var printHtml = function printHtml(element) {
  var selfOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaultOptions = {
    htmlType: 'domObj',
    printMode: '',
    pageTitle: '',
    templateString: '',
    popupProperties: '',
    stylesheets: null,
    styles: null
  };
  var options = _extends({}, defaultOptions, selfOptions);
  var html = element;;
  if (options.htmlType === 'domObj') {
    html = element.outerHTML;
  }

  // Get markup to be printed
  var markup = getMarkup(html, options);
  var printWindow = void 0;
  var printIframe = void 0;
  var printDocument = void 0;
  var printElementID = void 0;

  if (options.printMode.toLowerCase() === 'popup') {
    printWindow = window.open('about:blank', 'printElementWindow', options.popupProperties);
    printDocument = printWindow.document;
  } else {
    printElementID = 'printElement_' + Math.round(Math.random() * 99999).toString();

    printIframe = document.createElement('iframe');
    printIframe.setAttribute('id', printElementID);
    printIframe.setAttribute('src', 'about:blank');
    printIframe.setAttribute('frameBorder', '0');
    printIframe.setAttribute('scrolling', 'no');
    printIframe.setAttribute('style', 'position:fixed;bottom:100%;right:100%;');

    document.body.appendChild(printIframe);

    printDocument = printIframe.contentWindow || printIframe.contentDocument;
    if (printDocument.document) {
      printDocument = printDocument.document;
    }

    printIframe = document.frames ? document.frames[printElementID] : document.getElementById(printElementID);
    printWindow = printIframe.contentWindow || printIframe;
  }

  focus();
  printDocument.open();

  // SetTimeout fixesiframe printMode does not work in firefox
  setTimeout(function () {
    printDocument.write(markup);
    printDocument.close();
  });

  callPrint(printWindow, printIframe);
};

exports['default'] = printHtml;
module.exports = exports['default'];