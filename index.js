
/**
 * Module dependencies.
 */

var css = require('css');

/**
 * Decorations.
 */

var decorations = {
  bold: 1,
  italic: 3,
  underline: 4,
  inverse: 7,
};

/**
 * Colors.
 */

var colors = {
  white: 37,
  grey: 90,
  gray: 90,
  black: 30,
  blue: 34,
  cyan: 36,
  green: 32,
  red: 31,
  magenta: 35,
  yellow: 33,
  none: 0
};

/**
 * Background colors.
 */

var background = {
  white: 47,
  grey: 40,
  gray: 40,
  black: 40,
  blue: 44,
  cyan: 46,
  green: 42,
  red: 41,
  magenta: 45,
  yellow: 43,
  none: 0
};

/**
 * Compile format `str` to a function,
 * with optional css `style` string.
 *
 * @param {String} str
 * @param {String} style
 * @return {Function}
 * @api public
 */

exports.compile = function(str, style){
  str = str
    .replace(/"/g, '\\"')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')

  // parse css
  if (style) style = css.parse(style);

  // styled
  function styled(_,  name){
    // support {classname prop}
    name = name.split(' ');
    var classname = name.length > 1 ? name.shift() : name[0];
    name = name[0];
    var seq = sequence(classname, style);
    return '\\033[' + seq + 'm" + obj.' + name + ' + "\\033[0m';
  }

  // plain
  function plain(_,  name){
    // support {classname prop}
    name = name.split(' ');
    var classname = name.length > 1 ? name.shift() : name[0];
    name = name[0];
    return '" + obj.' + name + ' + "';
  }

  // parse format
  str = 'return "' + str.replace(/\{([^}]+)\}/g, style ? styled : plain) + '"';

  return new Function('obj', str);
};

/**
 * Return the ansi escape sequences
 * for `name` based on `style`.
 *
 * @param {String} name
 * @param {Object} style
 * @return {String}
 * @api public
 */

function sequence(name, style) {
  var buf = [];
  style = styles(name, style);

  // color
  if (style.color) {
    if (!colors[style.color]) throw new Error(style.color + ' is an invalid color');
    buf.push(colors[style.color]);
  }

  // text-decoration
  if (style['text-decoration']) buf.push(decorations[style['text-decoration']]);

  // font-weight
  if (style['font-weight'] && ~style['font-weight'].indexOf('bold')) {
    buf.push(decorations.bold);
  }

  // font-style
  if (style['font-style'] && ~style['font-style'].indexOf('italic')) {
    buf.push(decorations.italic);
  }

  // background
  if (style.background) {
    if (!background[style.background]) throw new Error(style.background + ' is an invalid background color');
    buf.push(background[style.background]);
  }

  return buf.join(';');
}

/**
 * Return a map of declarations for `name`.
 *
 * @param {String} name
 * @param {Object} style
 * @return {Object}
 * @api private
 */

function styles(name, style) {
  var styles = {};

  style.stylesheet.rules.forEach(function(rule){
    if (!~rule.selectors.indexOf(name)) return;
    rule.declarations.forEach(function(decl){
      styles[decl.property] = decl.value;
    });
  });

  return styles;
}