Meteor.publish("chatMessages", function(){
  if (this.userId){
    return msgList.find();
  }
});
