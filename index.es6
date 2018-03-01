import through from  'through2';
import split from 'split2';
import pumpify from 'pumpify';

module.exports = function() {

  let count = 0;

  const write = (line, enc, cb) => {

      if(!line.trim()) return cb();

      let vttLine = line
      .replace(/(WEBVTT\s*(FILE)?.*)(\r\n)*/g, '')
      .replace(/(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g, '$1,$2-->$3,$4')
      .replace(/\<.+\>(.+)/g, '$1')
      .replace(/\<.+\>(.+)\<.+\/\>/g, '$1')+'\r\n';

      if(!vttLine.trim()) return cb();

      if (/^Kind:|^Language:/m.test(vttLine)) {
        return cb();
      }

      if (/^[0-9]+:/m.test(vttLine)) {
        if (count === 0) {
          vttLine = `${++count}\r\n${vttLine}`;
        } else {
          vttLine = `\r\n${++count}\r\n${vttLine}`;
        }
      }

      cb(null, vttLine);
    
  };

  return pumpify(split(), through.obj(write));

};
