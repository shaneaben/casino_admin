import { Template } from 'meteor/templating';

import './layout.html';

Template.layout.onCreated(function() {

});

Template.layout.helpers({
  cordova: function () {
    return Meteor.isCordova
  }
});

Template.layout.events({

});
