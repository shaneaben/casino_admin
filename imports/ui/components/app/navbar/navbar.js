import './navbar.html';

import { Template } from 'meteor/templating';

Template.navbar.onCreated(async function mainOnCreated() {

});

Template.navbar.events({
  'click #logout'(e, template) {
    e.preventDefault();
    console.log('Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('experationDate');
    Router.go('/login');
  }
});
