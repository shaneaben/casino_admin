Router.configure({
  layoutTemplate: 'layout',
  // loadingTemplate: 'loading',
  // notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      // Meteor.subscribe('notifications', Meteor.userId())
    ];
  }
});

// let redirect = function(){
//   if(!Meteor.user()){
//     if(Meteor.isCordova){
//       this.redirect("/sign-in")
//     }
//     this.render('landingPage'); // if the user is not logged in then you send them to the about page
//   }
//
//   else{
//     this.next(); //this is just to say do the next instruction that was passed to it
//   }
// };
//
// Router.onBeforeAction(redirect, {only: 'landingPage'}); //redirect the user if he is logged in
