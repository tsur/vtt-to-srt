# vtt-to-srt

Convert [WebVTT](http://dev.w3.org/html5/webvtt/) (The Web Video Text Tracks Format, aka html5 video subtitles) into SubRip SRT.

It is a clone project from [srt-to-vtt](https://github.com/mafintosh/srt-to-vtt)

## Setting up

```
npm install vtt-to-srt
```

## Usage

``` js
var fs = require('fs');
var vtt = require('vtt-to-srt');

fs.createReadStream('subtitles.vtt')
  .pipe(vtt())
  .pipe(fs.createWriteStream('subtitles.srt'));

```