'use strict';

const mock = require('egg-mock');
const jwt = require('jsonwebtoken');

describe('test/passport-jwt.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/passport-jwt-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, passportJwt')
      .expect(200);
  });

  it('should throw 401 if no authorization header', () => {
    return app.httpRequest()
      .get('/protected')
      .expect(401);
  });

  it('should throw 401 if authorization header is invalid jwt', () => {
    const token = jwt.sign({ sub: '1234567890' }, 'unknown');
    return app.httpRequest()
      .get('/protected')
      .set('Authorization', 'Bearer ' + token)
      .expect(401);
  });

  it('should success if authorization header is valid jwt', () => {
    const token = jwt.sign({ sub: '1234567890' }, app.config.passportJwt.secret);
    return app.httpRequest()
      .get('/protected')
      .set('Authorization', 'Bearer ' + token)
      .expect('hi, passportJwt')
      .expect(200);
  });
});
