'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var _split2 = require('split2');

var _split22 = _interopRequireDefault(_split2);

var _pumpify = require('pumpify');

var _pumpify2 = _interopRequireDefault(_pumpify);

exports['default'] = function () {

  var block = [];

  var write = function write(line, enc, cb) {

    if (line.trim()) {

      block.push(line.trim());
      return cb();
    }

    var vttLine = block.join('\r\n').replace(/(WEBVTT\s*FILE?.*)(\r\n)*/g, '').replace(/(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g, '$1,$2-->$3,$4').replace(/\<.+\>(.+)/g, '$1').replace(/\<.+\>(.+)\<.+\/\>/g, '$1') + '\r\n';

    // console.log('LINE:', block.join('\r\n'));
    // console.log('REPLACE', vttLine);

    block = [];

    cb(null, vttLine);
  };

  return (0, _pumpify2['default'])((0, _split22['default'])(), _through22['default'].obj(write));
};

module.exports = exports['default'];

