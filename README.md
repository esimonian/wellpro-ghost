# Blank Ghost Theme

A boilerplate for ghost themes.

## Development

Styles are preprocessed using Sass. You'll need Node and Gulp installed globally. After that, from the theme's root directory:

```bash
$ npm install
$ gulp watch
```

Now you can edit `/assets/sass/` files, which will be compiled to `/assets/css/` automatically. All Javascript files in `assets/js/src` directory are minified to `assets/js/dist` directory.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
$ gulp zip
```
```bash
nodemon current/index.js --watch content/themes/soho
```
---

## Auto Release Deployment
### Travis CI
`travis.yml` is configured to push releases on tagged commits. You can setup your API key using Travis CI Client. Read more details here:
<br><br>
https://github.com/travis-ci/travis.rb <br>
https://docs.travis-ci.com/user/deployment/releases/

### Gitlab CI
`gitlab-ci.yml` is configured to push releases on Gitlab on tagged commits. Follow the steps mentioned in the following repo to setup your access token.
<br><br>
https://github.com/inetprocess/gitlab-release

---
## Credits
* [template](https://github.com/WaqasIbrahim/blank-ghost-theme/blob/master/assets/sass/abstracts/_variables.scss)
