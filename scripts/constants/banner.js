const info = require( '../../package.json' );

module.exports = `/*!
 * RiseSlider.js
 * Version  : ${ info.version }
 * License  : ${ info.license }
 * Copyright: ${ new Date().getFullYear() } ${ info.author }
 */`;
