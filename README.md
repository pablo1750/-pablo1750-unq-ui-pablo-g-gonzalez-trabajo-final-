

Installation
------------

```sh
npm install --save sweetalert2
```

Or grab from [jsdelivr CDN](https://www.jsdelivr.com/package/npm/sweetalert2)
:

```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
```


Usage
-----

```html
<script src="sweetalert2/dist/sweetalert2.all.min.js"></script>

<!-- Include a polyfill for ES6 Promises (optional) for IE11 -->
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.js"></script>
```

You can also include the stylesheet separately if desired:

```html
<script src="sweetalert2/dist/sweetalert2.min.js"></script>
<link rel="stylesheet" href="sweetalert2/dist/sweetalert2.min.css">
```

Or:

```js
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

// CommonJS
const Swal = require('sweetalert2')
```

Or with JS modules:

```html
<link rel="stylesheet" href="sweetalert2/dist/sweetalert2.css">

<script type="module">
  import Swal from 'sweetalert2/src/sweetalert2.js'
</script>
```

It's possible to import JS and CSS separately, e.g. if you need to customize styles:

```js
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
```

Please note that [TypeScript is well-supported](https://github.com/sweetalert2/sweetalert2/blob/master/sweetalert2.d.ts), so you don't have to install a third-party declaration file.


Examples
--------

The most basic message:

```js
Swal.fire('Hello world!')
```

A message signaling an error:

```js
Swal.fire('Oops...', 'Something went wrong!', 'error')
```

Handling the result of SweetAlert2 modal:

```js
Swal.fire({
  title: 'Are you sure?',
  text: 'You will not be able to recover this imaginary file!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Deleted!',
      'Your imaginary file has been deleted.',
      'success'
    )
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
})
```

## [Go here to see the docs and more examples ↗](https://sweetalert2.github.io/)


Browser compatibility
---------------------

 IE11* | Edge | Chrome | Firefox | Safari | Opera | UC Browser
-------|------|--------|---------|--------|-------|------------
:heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

\* ES6 Promise polyfill should be included, see [usage example](#usage).

Note that SweetAlert2 **does not** and **will not** provide support or functionality of any kind on IE10 and lower.



Themes ([`sweetalert2-themes ↗`](https://github.com/sweetalert2/sweetalert2-themes))
------

- [`Dark`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/dark)
- [`Minimal`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/minimal)
- [`Borderless`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/borderless)
- [`Bootstrap 4`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/bootstrap-4)
- [`Material UI`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/material-ui)
- [`WordPress Admin`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/wordpress-admin)
- [`Bulma`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/bulma)
- [`Default`](https://github.com/sweetalert2/sweetalert2-themes/tree/master/default)


Related projects
-------------------------

- [ngx-sweetalert2](https://github.com/sweetalert2/ngx-sweetalert2) - Angular 4+ integration
- [sweetalert2-react-content](https://github.com/sweetalert2/sweetalert2-react-content) - React integration
- [sweetalert2-webpack-demo](https://github.com/sweetalert2/sweetalert2-webpack-demo) - webpack demo
- [sweetalert2-parcel-demo](https://github.com/sweetalert2/sweetalert2-parcel-demo) - overriding SCSS variables demo


Related community projects
-------------------------

- [avil13/vue-sweetalert2](https://github.com/avil13/vue-sweetalert2) - Vue.js wrapper
- [realrashid/sweet-alert](https://github.com/realrashid/sweet-alert) - Laravel 5 Package
- [Basaingeal/Razor.SweetAlert2](https://github.com/Basaingeal/Razor.SweetAlert2) - Blazor Wrapper
- [ElectronAlert](https://electron.guide/electron-alert/) - SweetAlert2 for Electron applications (main process)


Collaborators
-------------

[![](https://avatars3.githubusercontent.com/u/17089396?v=4&s=80)](https://github.com/gverni) | [![](https://avatars3.githubusercontent.com/u/3198597?v=4&s=80)](https://github.com/zenflow) | [![](https://avatars1.githubusercontent.com/u/1343250?v=4&s=80)](https://github.com/toverux)
-|-|-
[@gverni](https://github.com/gverni) | [@zenflow](https://github.com/zenflow) | [@toverux](https://github.com/toverux)


Contributing
------------

[![Maintainability](https://api.codeclimate.com/v1/badges/eba34bb80477933854d4/maintainability)](https://codeclimate.com/github/sweetalert2/sweetalert2/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/sweetalert2/sweetalert2/blob/master/CHANGELOG.md)

If you would like to contribute enhancements or fixes, please do the following:

1. Fork the `sweetalert2` repository and clone it locally.

2. Make sure you have [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed.

3. When in the SweetAlert2 directory, run `npm install` or `yarn install` to install dependencies.

4. To begin active development, run `npm start` or `yarn start`. This does several things for you:
 - Builds the `dist` folder
 - Serves sandbox.html @ http://localhost:8080/ (browser-sync ui:  http://localhost:8081/)
 - Re-builds and re-loads as necessary when files change

Big Thanks
----------

- [Serena Verni (@serenaperora)](https://serena.verni.xyz) for creating the amazing project logo
- [Sauce Labs](https://saucelabs.com/) for providing the reliable cross-browser testing platform

Sponsors
--------

For all questions related to sponsorship please contact me via email limon.monte@gmail.com

[<img src="https://sweetalert2.github.io/images/sponsors/flowcrypt-banner.png">](https://flowcrypt.com/?utm_source=sweetalert2&utm_medium=banner)

[<img src="https://sweetalert2.github.io/images/plus.png" width="80">](SPONSORS.md) | [<img src="https://avatars2.githubusercontent.com/u/28631236?s=80&v=4" width="80">](https://flowcrypt.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/coderubik.png" width="80">](https://coderubik.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://www.ndchost.com/logos/ndchost-stacked-256x256-transparent.png" width="80">](https://ndchost.com/?utm_campaign=sponsorship&utm_source=github&utm_medium=sweetalert2) | [<img src="https://avatars0.githubusercontent.com/u/3986989?s=80&v=4" width="80">](https://github.com/tiagostutz)
-|-|-|-|-
[Become a sponsor](SPONSORS.md) | [FlowCrypt](https://flowcrypt.com/?utm_source=sweetalert2&utm_medium=logo) | [Code Rubik](https://coderubik.com/?utm_source=sweetalert2&utm_medium=logo) | [NDCHost](https://ndchost.com/?utm_campaign=sponsorship&utm_source=github&utm_medium=sweetalert2) | [Tiago de Oliveira Stutz](https://github.com/tiagostutz)

[<img src="https://sweetalert2.github.io/images/sponsors/zillathemes.png" width="80">](https://zillathemes.com/) | [<img src="https://sweetalert2.github.io/images/sponsors/sebaebc.png" width="80">](https://github.com/sebaebc)
-|-
[Zilla Themes](https://zillathemes.com/) | [SebaEBC](https://github.com/sebaebc)

NSFW Sponsors
-------------

[<img src="https://sweetalert2.github.io/images/sponsors/joylovedolls.png" width="80">](https://www.joylovedolls.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/twerkingbutt.jpg" width="80">](https://twerkingbutt.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/sex-toy-education.png" width="80">](https://sextoyeducation.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/sextopedia.png" width="80">](https://sextopedia.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/my-sex-toy-guide.jpg" width="80">](https://www.mysextoyguide.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/best-blowjob-machines.jpg" width="80">](https://www.bestblowjobmachines.com/?utm_source=sweetalert2&utm_medium=logo)
-|-|-|-|-|-
[Joy Love Dolls](https://www.joylovedolls.com/?utm_source=sweetalert2&utm_medium=logo) | [Twerking Butt](https://twerkingbutt.com/?utm_source=sweetalert2&utm_medium=logo) | [STED](https://sextoyeducation.com/?utm_source=sweetalert2&utm_medium=logo) | [Sextopedia](https://sextopedia.com/?utm_source=sweetalert2&utm_medium=logo) | [My Sex Toy Guide](https://www.mysextoyguide.com/?utm_source=sweetalert2&utm_medium=logo) | [Best Blowjob Machines](https://www.bestblowjobmachines.com/?utm_source=sweetalert2&utm_medium=logo)

[<img src="https://sweetalert2.github.io/images/sponsors/yourdoll.jpg" width="80">](https://www.yourdoll.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/sextoycollective.jpg" width="80">](https://sextoycollective.com/?utm_source=sweetalert2&utm_medium=logo) | [<img src="https://sweetalert2.github.io/images/sponsors/realsexdoll.png" width="80">](https://realsexdoll.com/?utm_source=sweetalert2&utm_medium=logo)| [<img src="https://sweetalert2.github.io/images/sponsors/doctorclimax.png" width="80">](https://doctorclimax.com/)
-|-|-|-
[YourDoll](https://www.yourdoll.com/?utm_source=sweetalert2&utm_medium=logo) | [STC](https://sextoycollective.com/?utm_source=sweetalert2&utm_medium=logo) | [RealSexDoll](https://realsexdoll.com/?utm_source=sweetalert2&utm_medium=logo) | [DoctorClimax](https://doctorclimax.com/)

Support and Donations
---------------------

Has SweetAlert2 helped you create an amazing application? You can show your support via [GitHub Sponsors](https://github.com/sponsors/limonte)

Alternative ways for donations (PayPal, cryptocurrencies, etc.) are listed here: https://sweetalert2.github.io/#donations

### [Hall of Donators :trophy:](DONATIONS.md)
