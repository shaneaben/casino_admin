import './login.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import axios from 'axios';
import swal from 'sweetalert2';

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

Template.login.onCreated(async function mainOnCreated() {
  this.loading =  new ReactiveVar(false);
  this.connected = new ReactiveVar(false);
  this.isSigningUp = new ReactiveVar(true);
  this.error = new ReactiveVar(null);
});

Template.login.helpers({
  isSigningUp() {
    return Template.instance().isSigningUp.get();
  },
  loading() {
    return Template.instance().loading.get();
  },
  connected() {
    return Template.instance().connected.get();
  },
  error() {
    return Template.instance().error.get();
  },
});

Template.login.events({
  'submit #connectWallet'(e, template) {
    e.preventDefault();
    template.error.set(null);

    const form = $(e.target);
    const user = {
      email: form.find('[name="email"]').val(),
      password: form.find('[name="password"]').val()
    };

    template.loading.set(true);

    axios.post('/user/login', user)
    .then(res => {
      console.log(res);
      const now = new Date();
      const experationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('experationDate', experationDate);

      template.loading.set(false);
      template.connected.set(true);

      Router.go('/dashboard');
    })
    .catch(error => {
      template.loading.set(false);
      template.error.set('Login failed');
      console.log(error);
    });
  }
});
