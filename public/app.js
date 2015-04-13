/**
 * @jsx React.DOM
 */

var socket = io.connect();


var Message = React.createClass({
  render: function(){
    // console.log(this.props)
    return(
      <li>
        {this.props.message.stamp} : {this.props.message.msg}
      </li>
    )
  }
});

var MessageList = React.createClass({
  render: function(){
    var renderMessage = function(message){
      return <Message key={message.id} message={message} />
    }
    // { this.props.messages.map(renderMessage)}
    return (
      <div>
      <h2> Messages: </h2>
      <ul id="messages">
        {this.props.messages.map(function(message) {
           return <li key={message.id}>{message.stamp}: {message.msg}</li>;
        })}
      </ul>
      </div>
    );
  }
});



var uniqueId=999;
var ChatApp = React.createClass({

  getInitialState: function(){

    socket.on('todashboard', this.messageRecieve);

    return {messages:[]};
  },

  messageRecieve: function(message){
    var maxMessages = 10;
    var messages = this.state.messages;
    message.id = uniqueId++;
    message.stamp = new Date().toISOString();

    messages.unshift(message);
    while (messages.length>maxMessages){
      messages.pop();
    }
    this.forceUpdate();
  },

  render : function(){
    return (
      <div>
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
});

// React.render(<Hello name="World" />, document.body);
// React.render(<CommentBox />, document.body);
// React.render(<Message text="Blabla" />, document.body);
React.render(<ChatApp />, document.body);


