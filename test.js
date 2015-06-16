"use strict";

var tape = require('tape');
var vtt2srt = require('./');
var concat = require('concat-stream');

tape('empty', function(t) {

  var convert = vtt2srt();

  convert.end();

  convert.pipe(concat(function(data) {

    t.same(data.toString(), '');

    t.end();

  }));

});

tape('one entry', function(t) {

  var convert = vtt2srt();

  convert.write('WEBVTT FILE\r\n\r\n1\r\n00:00:10.500 --> 00:00:13.000\r\nthis is a test\r\n\r\n');

  convert.end();

  convert.pipe(concat(function(data) {

    t.same(data.toString(), '1\r\n00:00:10,500 --> 00:00:13,000\r\nthis is a test\r\n');

    t.end();

  }));

});

tape('two entries', function(t) {

  var convert = vtt2srt();

  convert.write('WEBVTT FILE\r\n\r\n1\r\n00:00:10.500 --> 00:00:13.000\r\nthis is a test\r\n\r\n2\r\n00:00:14.500 --> 00:00:15.000\r\nthis is a test\r\n\r\n');

  convert.end();

  convert.pipe(concat(function(data) {

    t.same(data.toString(), '1\r\n00:00:10,500 --> 00:00:13,000\r\nthis is a test\r\n2\r\n00:00:14,500 --> 00:00:15,000\r\nthis is a test\r\n');

    t.end();

  }));

});