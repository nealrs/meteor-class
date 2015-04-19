Meteor.methods({
  insertPost: function(name, text){
    if (Meteor.user()){
      newInsert = msgList.insert({
        'message': text,
        'name': name,
        "date": new Date()
      });
    }

    return newInsert;
  },

  countUsers: function(){
    uc = Meteor.users.find().count();
    return uc;
  }
});
