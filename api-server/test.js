var detectLang = require('lang-detector');

const res = detectLang('def main("Hello world");');

console.log(res);
