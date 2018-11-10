export const RequireLoginController = RouteController.extend({
	onBeforeAction: function () {
    const token = localStorage.getItem('token');
      if (!token) {
        this.redirect('login');
      }

      const experationDate = localStorage.getItem('experationDate');
      const now = new Date();

      if (now >= experationDate) {
        this.redirect('login');
      }
      
      else {
        this.next();
      }
	}
});
