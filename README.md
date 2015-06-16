# vtt-to-srt

Convert [WebVTT](http://dev.w3.org/html5/webvtt/) (The Web Video Text Tracks Format, aka html5 video subtitles) into SubRip SRT.

Check it out [srt-to-vtt](https://github.com/mafintosh/srt-to-vtt) for reverse convertion.

## Setting up

```bash
npm install vtt-to-srt
# or set it up globally
npm install vtt-to-srt --global
```

## Command line

You may use it from the terminal if vtt-to-str was installed globally

```bash
vtt-to-srt example.vtt example.srt
cat example.vtt | vtt-to-srt > example.str
vtt-to-srt example.str < example.vtt
```

## Usage

If converting from a text file:

``` js
import fs from 'fs';
import vtt2srt from 'vtt-to-srt';

fs.createReadStream(__dirname + '/subtitles.vtt')
  .pipe(vtt())
  .pipe(fs.createWriteStream(__dirname + '/subtitles.srt'));

```

If converting from an string:

``` js
import fs from 'fs';
import vtt2srt from 'vtt-to-srt';

const vttString = 'WEBVTT FILE\r\n1\r\n00:00:01.000 --> 00:00:02.000\r\nthis is WebVTT';

const srtStream = vtt2srt();

srtStream.write(vttString);
srtStream.end();
srtStream.pipe(fs.createWriteStream(__dirname + '/subtitles.srt'));

```

## Test

```
npm run test
```