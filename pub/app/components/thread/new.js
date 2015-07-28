var React = require('react');
var ThreadStore = require('../../stores/ThreadStore');
var ThreadActions = require('../../actions/ThreadActions');
var AuthStore = require('../../stores/AuthStore');

var NewThread = React.createClass({
  getInitialState: function(){
    if(!AuthStore.loggedIn()){
      location.hash = '/login';
    }
    return {
      success: false
    };
  },

  componentDidMount: function(){
    ThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    ThreadStore.removeChangeListener(this._onChange);
  },

  addThread: function(){
    // Send action to update user information
    var title = React.findDOMNode(this.refs.title).value.trim();
    var body = React.findDOMNode(this.refs.body).value.trim();
    var link = React.findDOMNode(this.refs.link).value.trim();
    var tag = React.findDOMNode(this.refs.tag).value.trim();

    if(!title || !body){
      return;
    }

    ThreadActions.add({
      title: title,
      body: body,
      link: link,
      tag: tag
    });

  },

  _onChange: function(){
    location.hash = '/';
  },


  render: function() {
    return (
      <div className="col-md-12">
        <h3>New Thread</h3>
        <div className="newThread center-block">
            <form onSubmit={this.addThread}>
              <input type="text" className="form-control" placeholder="Title" ref="title" />
              <input type="text" className="form-control" placeholder="Link" ref="link" />
              <input type="textarea" className="form-control" placeholder="Body" ref="body" />
              <input type="text" className="form-control" placeholder="Tag" ref="tag" />
              <button type="submit" className="btn btn-success" value="Submit">Submit</button>
            </form>
        </div>
      </div>
    );
  }
});

module.exports = NewThread;