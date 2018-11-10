import { RequireLoginController as requireLoginController} from '../controllers/requireLoginController';

Router.route('/dashboard',{
	name: 'dashboard',
	template: 'dashboard',
	controller: requireLoginController
});
