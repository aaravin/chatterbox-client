// YOUR CODE HERE:
var user = {
  myUsername: undefined,
  friendList: [],
  currentRoom: '',
  roomList: {}
};

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
};

app.init = function(){
  $(document).ready(function(){
    user.myUsername = location.search.slice(location.search.indexOf('username=')+9).replace(/\+/g,' ');
    app.clearMessages();
    //setInterval(app.fetch, 500);
    $('.username').on('click',function(){
      app.addFriend($(this).text());
    });

    $('.submit').on('submit', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      app.handleSubmit($('#message').val());
    });

    $('#roomSelect').on('change', function() {
      user.currentRoom = $(this).val();
      app.fetch();
    });
  });
};

app.send = function(message){
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      // app.fetch();
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
    order: 'createdAt',
    success: function (data) {
      console.log('chatterbox: Messages received');
      app.clearMessages();

      for(var i = 0; i < data.results.length; i++){
        app.addMessage(data.results[i]);
        // user.roomList[data.results[i].roomname] = data.results[i].roomname;
        app.addRoom(data.results[i].roomname);
      }
      console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

app.clearMessages = function(){
  $('#chats').children().remove();
};

app.addMessage = function(message){
  if(message.roomname !== user.currentRoom){
    return;
  }
  $('#chats').append('<p> <span class="username">'
    + _.escape(message.username)+'</span>: '
    + _.escape(message.text)+'</p>');
};

app.addRoom = function(roomName){
  if(roomName === undefined){
    return;
  }
  if (!user.roomList.hasOwnProperty(roomName)) {
    $('#roomSelect').append('<option value="'+roomName+'">'+roomName+'</option>');
    user.roomList[roomName] = roomName;
  }
};

app.addFriend = function(friendName){
  user.friendList.push(friendName);
};

app.handleSubmit = function(message){
  var messageObj = {
    username: user.myUsername,
    text: message,
    roomname: user.currentRoom
  };
  console.log(messageObj);
  app.send(messageObj);
};

app.init();
