// Npm run build, obfuscares thtml.js and saves to public/html.js and obfuscates tindex.html and saves to public/index.html
var fs = require('fs');
var JavaScriptObfuscator = require('javascript-obfuscator');
var path = require('path');

var html = fs.readFileSync(path.join(__dirname, 'tindex.html'), 'utf8');
var js = fs.readFileSync(path.join(__dirname, 'thtml.js'), 'utf8');

// Obfuscate the HTML by encoding it and replacing the original with <script>document.write(decodeURIComponent([...]))</script>
var obfuscatedHtml = "<script>document.write(decodeURIComponent('" + encodeURIComponent(html) + "'))</script>";
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), obfuscatedHtml);

// Obfuscate the JS
var obfuscatedJs = JavaScriptObfuscator.obfuscate(js, {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 1,
  debugProtection: true,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  renameGlobals: true,
  rotateStringArray: true,
  selfDefending: true,
  stringArray: true,
  stringArrayThreshold: 1,
  unicodeEscapeSequence: true
});
fs.writeFileSync(path.join(__dirname, 'public', 'html.js'), obfuscatedJs.getObfuscatedCode());
console.log('Build complete');