/* Convert from a string to a string */

import fs from 'fs';
import vtt2srt from '..'; // NOTE: replace '..' for 'vtt-to-srt' in your project

const vttString = 'WEBVTT FILE\r\n1\r\n00:00:01.000 --> 00:00:02.000\r\nthis is WebVTT';

const srtStream = vtt2srt();

srtStream.write(vttString);
srtStream.end(() => console.log(srtStream.read().toString('utf-8')));