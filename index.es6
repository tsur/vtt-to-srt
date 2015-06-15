import through from  'through2';
import split from 'split2';
import pumpify from 'pumpify';

export default function() {

  let block = [];

  var write = function(line, enc, cb) {

    if (line.trim()) {

      block.push(line.trim());
      return cb();

    }

    const vttLine = block.join('\r\n')
      .replace(/(WEBVTT\s*FILE?.*)(\r\n)*/g, '')
      .replace(/(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g, '$1,$2-->$3,$4')
      .replace(/\<.+\>(.+)/g, '$1')
      .replace(/\<.+\>(.+)\<.+\/\>/g, '$1')
      +'\r\n';

    // console.log('LINE:', block.join('\r\n'));
    // console.log('REPLACE', vttLine);

    block = [];

    cb(null, vttLine);
    
  }

  return pumpify(split(), through.obj(write));

}