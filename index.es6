import through from  'through2';
import split from 'split2';
import pumpify from 'pumpify';

export default function() {

  const write = (line, enc, cb) => {

      if(!line.trim()) return cb();

      const vttLine = line
      .replace(/(WEBVTT\s*(FILE)?.*)(\r\n)*/g, '')
      .replace(/(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g, '$1,$2-->$3,$4')
      .replace(/\<.+\>(.+)/g, '$1')
      .replace(/\<.+\>(.+)\<.+\/\>/g, '$1')+'\r\n';

      if(!vttLine.trim()) return cb();

      cb(null, vttLine);
    
  };

  return pumpify(split(), through.obj(write));

}
