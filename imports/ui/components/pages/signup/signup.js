import './signup.html';

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

Template.signup.onCreated(async function mainOnCreated() {
  this.loading =  new ReactiveVar(false);
  this.connected = new ReactiveVar(false);
  this.isSigningUp = new ReactiveVar(true);
  this.error = new ReactiveVar(null);
});

Template.signup.helpers({
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

Template.signup.events({
  'submit #createWallet'(e, template) {
    e.preventDefault();

    const form = $(e.target);
    const user = {
      first_name: form.find('[name="firstName"]').val(),
      last_name: form.find('[name="lastName"]').val(),
      email: form.find('[name="createEmail"]').val(),
      password: form.find('[name="createPassword"]').val(),
      role: 'casino'
    };

    template.loading.set(true);

    console.log("Herefib");

    axios.post('/user/signup', user)
    .then(res => {
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
      template.error.set('Email already exists');
      console.log(error);
    });

  }
});
