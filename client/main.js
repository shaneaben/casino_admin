import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import axios from 'axios';
import swal from 'sweetalert2';

import './main.html';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.get['Accepts'] = 'application/json';

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config);
  return config;
});

const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res);
  return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

Template.main.onCreated(async function mainOnCreated() {
  this.loading =  new ReactiveVar(false);
  this.connected = new ReactiveVar(false);
  this.isSigningUp = new ReactiveVar(true);


  const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const experationDate = localStorage.getItem('experationDate');
    const now = new Date();

    if (now >= experationDate) {
      return;
    }

    const userId = localStorage.getItem('userId');
    this.connected.set(true);
});

Template.main.helpers({
  isSigningUp() {
    return Template.instance().isSigningUp.get();
  },
  loading() {
    return Template.instance().loading.get();
  },
  connected() {
    return Template.instance().connected.get();
  }
});

Template.main.events({
  'click #logout'(e, template) {
    e.preventDefault();
    console.log('Logout');
    template.connected.set(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('experationDate');
  },
  'click .toggleSignUp'(e, template) {
    e.preventDefault();
    template.isSigningUp.set(!template.isSigningUp.get());
  },
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

    axios.post('/user/signup', user)
    .then(res => {
      const now = new Date();
      const experationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('experationDate', experationDate);

      template.loading.set(false);
      template.connected.set(true);
    })
    .catch(error => {
      template.loading.set(false);
      console.log(error);
    });

  },

  'submit #connectWallet'(e, template) {
    e.preventDefault();

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
    })
    .catch(error => {
      template.loading.set(false);
      console.log(error);
    });
  }
});
