#!/usr/bin/env node

var fs = require('fs');
var vtt2str = require('./');
var cli = process.argv.slice(2);

var printHelp = function printHelp() {

  console.error('Usage: vtt-to-srt [vtt_file] [srt_file]');
  process.exit(0);

}

if (typeof cli[0] === 'string' && cli[0].toLowerCase().indexOf('help') > -1) {

  return printHelp();

}

process.stdout.on('error', function(err) {

  if (err.code !== 'EPIPE') throw err

});

if (cli.length >= 2) {

  var input = fs.createReadStream(cli[0]);
  var output = fs.createWriteStream(cli[1]);

} else if (cli.length === 1) {

  var input = process.stdin;
  var output = fs.createWriteStream(cli[0]);

} else {

  var input = process.stdin;
  var output = process.stdout;

}

input.pipe(vtt2str()).pipe(output)