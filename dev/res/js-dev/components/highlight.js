module.exports = _ => {

  var Prism = require('prismjs');

  var codes = [].slice.call(document.getElementsByTagName('code'));

  function highlightCode(code) {
    code.innerHTML = Prism.highlight(code.textContent, Prism.languages.javascript, 'javascript');
  }

  codes.forEach(highlightCode);

}
