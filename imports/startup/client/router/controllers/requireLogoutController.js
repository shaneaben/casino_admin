export const RequireLogoutController = RouteController.extend({
	onBeforeAction: function () {
    const token = localStorage.getItem('token');
      if (token) {
        this.redirect('dashboard');
      }

      const experationDate = localStorage.getItem('experationDate');

      const now = new Date();

      if (now <= experationDate) {
				this.redirect('dashboard');

      }

      else {
        this.next();
      }
	}
});
