'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null });

  router.get('/', controller.home.index);
  router.get('/protected', jwt, controller.home.index);
};
