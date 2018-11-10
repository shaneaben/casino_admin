import { RequireLogoutController as requireLogoutController } from '../controllers/requireLogoutController';

Router.route('/', {
  name: 'landingPage',
  template: 'landingPage',
  controller: requireLogoutController
});
