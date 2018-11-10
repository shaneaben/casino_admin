import './dashboard.html';

import { Template } from 'meteor/templating';

Template.dashboard.onCreated(async function mainOnCreated() {

});

Template.dashboard.events({
  'click .logout'(e, template) {
    e.preventDefault();
    console.log('Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('experationDate');
    Router.go('/login');
  }
});
