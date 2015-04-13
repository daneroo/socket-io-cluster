/**
 * @jsx React.DOM
 */

var socket = io.connect();


var Message = React.createClass({
  render: function(){
    var cx = React.addons.classSet;
    var classes = cx({
      'odd': this.props.message.id%2,
    });
    return(
      <li className={classes}>
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
    return (
      <div className="section">
        <h2> Messages: </h2>
        <ul className="messages">
          { this.props.messages.map(renderMessage)}
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

React.render(<ChatApp />, document.getElementById('content'));


