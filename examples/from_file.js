/* Convert from a subtitles.vtt to a subtitles.srt */

import fs from 'fs';
import vtt2srt from '..'; // NOTE: replace '..' for 'vtt-to-srt' in your project

fs.createReadStream(__dirname + '/subtitles.vtt')
    .pipe(vtt2srt())
    .pipe(fs.createWriteStream(__dirname + '/subtitles.srt'));