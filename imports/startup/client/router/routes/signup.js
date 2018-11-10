import { RequireLogoutController as requireLogoutController } from '../controllers/requireLogoutController';

Router.route('/signup',{
	name: 'signup',
	template: 'signup',
	controller: requireLogoutController
});
