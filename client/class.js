Session.set("chatName", "Room A");

setInterval(function(){
  Meteor.call("countUsers", function(err, res){
    if (!err){
      Session.set("userCount", res);
    }
  });
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Meteor.subscribe("chatMessages");

Template.messages.helpers({
  msg: function(){
    return msgList.find();
  }
});

Template.header.helpers({
  userCount: function(){

      if ( Session.get("userCount") === 1){
        return "1 knucklehead";
      } else {
          return Session.get("userCount") + " knuckleheads";
        }

  },
  roomName: function(){
    return Session.get("chatName");
  }
});

Template.message.helpers({
  name: function(){
    if (this.name){
      return this.name;
    } else {
        return "Anon";
      }
  },

  date: function(){
    return moment(this.date).fromNow();
  }
});


Template.insert.events({
  submit: function(e,t){
    e.preventDefault();

    //get & format data
    var text = $("#msgBox").val();
    var name = Meteor.user().username;

    // insert data
    Meteor.call("insertPost", name, text, function(error, result){
      if (!error){
        $("#msgBox").val("");
        //console.log(result);
      } else {
          console.log('Womp womp - try again.');
        }
    });
  }
});


Template.insert.helpers({
  signedIn: function(){
    return Meteor.user();
  }
});
