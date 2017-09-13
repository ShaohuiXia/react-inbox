import React, { Component} from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import ComposeMessage from './components/ComposeMessage';

class App extends Component {

    state = {
        messages: [],
        composeMessageOpen: false,
        subject: '',
        body: ''
    };

    constructor(props) {
        super(props);
        this.state = {  messages: [],
                        localMessage: [],
                        subject: '',
                        body: ''
        };
        this.readButtonClick = this.readButtonClick.bind(this);
        this.onTrashClick = this.onTrashClick.bind(this);
        this.selectAllClick = this.selectAllClick.bind(this);
        this.starChecked = this.starChecked.bind(this);
        this.checkboxChecked = this.checkboxChecked.bind(this);
        this.onLabelAdded = this.onLabelAdded.bind(this);
        this.unReadButtonClick = this.unReadButtonClick.bind(this);
        this.removeLabelClick = this.removeLabelClick.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    async componentDidMount() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`);
        const json = await response.json();
        this.setState({messages: json._embedded.messages})
    }

    async readButtonClick() {
        const readList = this.state.messages.map((message) => { 
            return message.selected ? {...message, read: true} : message 
        });  

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, { 
            method: 'PATCH', 
            body: JSON.stringify({ 
                "messageIds": readList.map((message) => (message.id)), 
                "command": "read", 
                "read": true 
            }), 
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
            } 
        });

        this.setState({messages:readList})
    }

    async unReadButtonClick(){
        const unReadList = this.state.messages.map((message, i) => {
            return message.selected ? {...message, read: false} : message
        });

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": unReadList.map((message)=> (message.id)),
                "command": "read",
                "read": false 
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState({messages:unReadList})
    }

    async removeLabelClick(e){
        const selectedValue = e.target.value;
        const newLabelList = this.state.messages.map(message => {
            const index = message.labels.indexOf(selectedValue);

            if(index !== -1 && message.selected) {
                message.labels.splice(index,1);
            }
            return message
        });

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": newLabelList.map((message) => (message.id)),
                "command": "removeLabel",
                "label": selectedValue
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState({messages: newLabelList});
    }

    selectAllClick = () => {
        const selectedList = this.state.messages.map((message) => {
            return {...message, selected: true}
        });

        const unselectedList = this.state.messages.map((message) => {
            return {...message, selected: false}
        });

       const selectOrUnselect = this.state.messages.filter((message) => (
                !message.selected
           )
       );
       if(selectOrUnselect.length > 0) {
           this.setState({messages: selectedList})
       }
        else {
           this.setState({messages: unselectedList})
           }
       };



    async starChecked (id) {
        const selectedMessage = this.state.messages.filter(message => {
            return message.id == id
        });

        selectedMessage[0].starred = !selectedMessage[0].starred;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": selectedMessage.map((message) => message.id),
                "command": "star",
                "star": !selectedMessage[0].starred
                     }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState({messages: this.state.messages})
    }

    checkboxChecked = (id) => {
      const selectedMessage = this.state.messages.filter(message => {
        return message.id == id
    });

       selectedMessage[0].selected = !selectedMessage[0].selected;
       this.setState({messages: this.state.messages})
    };

    async onLabelAdded(e) {
        const selectedLabel = e.target.value; 
        if( !e.target.selectedIndex) 
            return;  

        const labelList = this.state.messages.map((message) => { 
                message.selected &&  !message.labels.includes(selectedLabel) 
                ? message.labels = message.labels.concat([selectedLabel]) 
                : '';  
            return message 
        });  

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": labelList  .map((message) => (message.id)),
                "command": "addLabel",
                "label": selectedLabel
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState({messages:labelList})
    }

    async onTrashClick() {
        const anySelected = this.state.messages.filter(message => { return !message.selected });

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": anySelected.map((message) => (message.id)),
                "command": "delete"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState({messages: anySelected})
    }

    calculateUnreadMessages = () => {
        const unreadMessage = this.state.messages.filter(message => !message.read);

        return unreadMessage.length
    };

    selectAllStyle = () => {
        const selectedMessageCount = this.state.messages.filter(message => {
            return message.selected
        });

        const maxMessageCount = this.state.messages.length;
        var selectStyle = "";

        if(selectedMessageCount.length === maxMessageCount) {
            selectStyle = "fa fa-check-square-o";
        }
        else if(selectedMessageCount.length >= 1 && selectedMessageCount.length < maxMessageCount) {
            selectStyle = "fa fa-minus-square-o";
        }
        else{
            selectStyle = "fa fa-square-o";
        }

        return selectStyle;
    };

    composeMessageClick = () => {
      this.setState({ composeMessageOpen: !this.state.composeMessageOpen })
    };

    async sendMessage() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                "subject": this.state.subject,
                "body": this.state.body
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }

    handleSubjectInputChange = (event) => {
        this.setState({subject: event.target.value})
    };

    handleBodyInputChange = (event) => {
        this.setState({body: event.target.value})
    };

  render() {
    return (
      <div className="App">
          <Toolbar
              onReadButtonClick={this.readButtonClick}
              onUnReadButtonClick={this.unReadButtonClick}
              onAddLabelClick={this.addLabelClick}
              onRemoveLabelClick={this.removeLabelClick}
              onSelectAllClick={this.selectAllClick}
              onLabelAdded={this.onLabelAdded}
              removeLabelClick={this.removeLabelClick}
              selectAllStyle={this.selectAllStyle()}
              onTrashClick={this.onTrashClick}
              numUnreadMessages={this.calculateUnreadMessages()}
              onComposeMessageClick= {this.composeMessageClick}
          />
          { this.state.composeMessageOpen && <ComposeMessage sendMessage={this.sendMessage}
                                                             handleSubjectInputChange={this.handleSubjectInputChange}
                                                             handleBodyInputChange={this.handleBodyInputChange}/> }
          <Messages messages={this.state.messages}
                    starChecked={this.starChecked}
                    checkboxChecked={this.checkboxChecked}
          />
      </div>
    );
  }
}

export default App;
