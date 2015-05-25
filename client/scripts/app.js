// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
};

app.init = function(){
  $(document).on('click','.username',function(){

  });
};

app.send = function(message){
  $.ajax({
    URL: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    url: this.server,
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Messages received');
      app.clearMessages();
      for(var i = 0; i < data.results.length; i++){
        app.addMessage(data.results[i]);
      }
      //console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

app.clearMessages = function(){
  $('#chats').children().remove();
}

app.addMessage = function(message){
  $('#chats').append('<p>'+message.username+': '+message.text+'</p>');
}

app.addRoom = function(roomName){
  $('#roomSelect').append('<option value="'+roomName+'">'+roomName+'</option>')
}

app.addFriend = function(){

}