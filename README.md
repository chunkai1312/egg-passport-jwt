# egg-passport-jwt

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-passport-jwt.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-passport-jwt
[travis-image]: https://img.shields.io/travis/chunkai1312/egg-passport-jwt.svg?style=flat-square
[travis-url]: https://travis-ci.org/chunkai1312/egg-passport-jwt
[codecov-image]: https://img.shields.io/codecov/c/github/chunkai1312/egg-passport-jwt.svg?style=flat-square
[codecov-url]: https://codecov.io/github/chunkai1312/egg-passport-jwt?branch=master
[david-image]: https://img.shields.io/david/chunkai1312/egg-passport-jwt.svg?style=flat-square
[david-url]: https://david-dm.org/chunkai1312/egg-passport-jwt
[snyk-image]: https://snyk.io/test/npm/egg-passport-jwt/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-passport-jwt
[download-image]: https://img.shields.io/npm/dm/egg-passport-jwt.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-passport-jwt

<!--
Description here.
-->

## Install

```bash
$ npm i egg-passport-jwt --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.passportJwt = {
  enable: true,
  package: 'egg-passport-jwt',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.passportJwt = {
  secret: 'your jwt secret or key',
};
```

see [passport-jwt](https://github.com/themikenicholson/passport-jwt) for more detail.

## Example

### Authenticate requests

Use `app.passport.authenticate()` specifying `'jwt'` as the strategy.

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null });

  router.get('/', controller.home.index);
  router.get('/protected', jwt, controller.home.index);
};
```

### Include the JWT in requests

The method of including a JWT in a request depends entirely on the extractor
function you choose. For example, if you use the `fromAuthHeaderAsBearerToken`
extractor (default), you would include an `Authorization` header in your request with the
scheme set to `bearer`. e.g.

    Authorization: bearer JSON_WEB_TOKEN_STRING...

### Verify and store user

Use `app.passport.verify(async (ctx, user) => {})` hook:

```js
// app.js
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    // check user
    assert(user.provider, 'user.provider should exists');
    assert(user.payload, 'user.payload should exists');

    // find user from database
    const existsUser = await ctx.model.User.findOne({ id: user.payload.sub });
    if (existsUser) return existsUser;

    // or you could create a new user
  });
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/chunkai1312/egg-passport-jwt/issues).

## License

[MIT](LICENSE)
