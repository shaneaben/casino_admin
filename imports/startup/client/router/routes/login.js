import { RequireLogoutController as requireLogoutController } from '../controllers/requireLogoutController';

Router.route('/login',{
	name: 'login',
	template: 'login',
	controller: requireLogoutController
});
