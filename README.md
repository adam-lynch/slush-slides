slush-slides [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
===========

A ([slush](https://github.com/klei/slush)) slidedeck generator.

See the [demo](http://www.adamlynch.com/slush-slides) (also includes usage guide).


## Installation

** Install slush, gulp and bower, if haven't got them already (why not?!) **

1. `npm install -g slush`
2. `npm install -g gulp`
3. `npm install -g bower`

---

**Install slush-slides**

1. `npm install -g slush-slides`


## Usage

1. In an empty directory, run `slush slides`. This will give you a nice boilerplate structure to generate your slides.
2. Edit a slide in `slides/`.
3. Run `gulp` to generate the slide-deck.
4. See your masterpiece at `index.html`.

## Roadmap

- Gulp tasks for converting your slides to images / a PDF
- Better image path handling
- Themes and or templates
- And more


[npm-url]: https://npmjs.org/package/slush-slides
[npm-image]: https://badge.fury.io/js/slush-slides.png

[travis-url]: http://travis-ci.org/adam-lynch/slush-slides
[travis-image]: http://img.shields.io/travis/adam-lynch/slush-slides.svg?style=flat

[depstat-url]: https://david-dm.org/adam-lynch/slush-slides
[depstat-image]: https://david-dm.org/adam-lynch/slush-slides.png
