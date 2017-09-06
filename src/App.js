import React, { Component, PropTypes} from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import ComposeMessage from './components/ComposeMessage';
import _ from "lodash";
class App extends Component {

    state = {
        messages: [],
        composeMessageOpen: false
    }

    // async componentDidMount() {
    //     const response = await fetch('http://localhost:8082/api/messages')
    //     const json = await response.json()
    //     this.setState({messages: json})
    // }

    constructor(props){
        super(props)
        this.state = {
            selectAllSelected: false,
            messages: [{
                "id": 1,
                "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
                "read": false,
                "starred": true,
                "selected": false,
                "labels": ["dev", "personal"]
            },
                {
                    "id": 2,
                    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
                    "read": false,
                    "starred": false,
                    "selected": true,
                    "labels": []
                },
                {
                    "id": 3,
                    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
                    "read": false,
                    "starred": true,
                    "labels": ["dev"]
                },
                {
                    "id": 4,
                    "subject": "We need to program the primary TCP hard drive!",
                    "read": true,
                    "starred": false,
                    "selected": true,
                    "labels": []
                },
                {
                    "id": 5,
                    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
                    "read": false,
                    "starred": false,
                    "labels": ["personal"]
                },
                {
                    "id": 6,
                    "subject": "We need to back up the wireless GB driver!",
                    "read": true,
                    "starred": true,
                    "labels": []
                },
                {
                    "id": 7,
                    "subject": "We need to index the mobile PCI bus!",
                    "read": true,
                    "starred": false,
                    "labels": ["dev", "personal"]
                },
                {
                    "id": 8,
                    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
                    "read": true,
                    "starred": true,
                    "labels": []
                }
            ]
        }
    }

  readButtonClick = () => {
        // const response = await fetch('http://localhost:8082/api/messages', {
        //     method: 'POST',
        //     body: JSON.stringify(),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     }
        // })
        // const message = await response.json()

        const readList = this.state.messages.map((message, i) => {
            return message.selected ? {...message, read: true} : message
        })

        this.setState({messages:readList})

        // this.setState({people: [...this.state.people, person]})
    }


    readButtonClick = () => {
        const readList = this.state.messages.map((message, i) => {
            return message.selected ? {...message, read: true} : message
        })

        this.setState({messages:readList})

    }

    async readButtonClick() {
        const response = await fetch('http://localhost:9090/api/messages', {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": [ 1, 3 ],
                "command": "read",
                "read": true
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const person = await response.json()
        this.setState({people: [...this.state.people, person]})
    }

    unReadButtonClick = () => {
        const unReadList = this.state.messages.map((message, i) => {
            return message.selected ? {...message, read: false} : message
        })

        this.setState({messages:unReadList})
    }

    removeLabelClick = (e) => {
        let newLabelList = _.cloneDeep(this.state.messages);
        const selectedValue = e.target.value;

        newLabelList.map(message => {
            const index = message.labels.indexOf(selectedValue);

            if(index !== -1 && message.selected) {
                message.labels.splice(index,1);
            }
            return message;
        })

        this.setState({messages: newLabelList});
    }

    selectAllClick = () => {
        const selectedList = this.state.messages.map((message) => {
            return {...message, selected: true}
        })

        const unselectedList = this.state.messages.map((message) => {
            return {...message, selected: false}
        })

       const selectOrUnselect = this.state.messages.filter((message) => (
                !message.selected
           )
       )

       if(selectOrUnselect.length > 0) {
           this.setState({messages: selectedList})
       }
        else {
           this.setState({messages: unselectedList})
       }
    }

    starChecked = (id) => {
        const selectedMessage = this.state.messages.filter(message => {
            return message.id == id
        })

        selectedMessage[0].starred = !selectedMessage[0].starred

        this.setState({messages: this.state.messages})
    }

    checkboxChecked = (id) => {
      const selectedMessage = this.state.messages.filter(message => {
        return message.id == id
    })

       selectedMessage[0].selected = !selectedMessage[0].selected

        this.setState({messages: this.state.messages})
    }

    onLabelAdded = (e) => {
      const selectedLabel = e.target.value;
      if( !e.target.selectedIndex)
          return

        const labelList = this.state.messages.map((message) => {
            message.selected &&  !message.labels.includes(selectedLabel)
                ? message.labels = message.labels.concat([selectedLabel])
                : '';

            return message
        })

        this.setState({messages:labelList})
    }

    selectAll = () => {
        const anySelected = this.state.messages.filter(message => {
            return !message.selected
        })

        if(anySelected.length > 0) {
            this.setState({selectAllSelected: true})
        }
    }

    onTrashClick = () => {
        const anySelected = this.state.messages.filter(message => {
            return !message.selected
        })

        this.setState({messages: anySelected})
    }

    calculateUnreadMessages = () => {
        const unreadMessage = this.state.messages.filter(message => !message.read)

        return unreadMessage.length
    }

    selectAllSelected = () => {
        const selectedMessageCount = this.state.messages.filter(message => {
            return message.selected
        })

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
    }

    composeMessageClick = () => {
      this.setState({ composeMessageOpen: !this.state.composeMessageOpen })
    }

    sendMessage = (e) => {
        const newSubject = e.target.subject.text;
        this.setState({...this.state.messages, subject: newSubject})
    }

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
              selectAllSelected={this.selectAllSelected()}
              onTrashClick={this.onTrashClick}
              numUnreadMessages={this.calculateUnreadMessages()}
              onComposeMessageClick= {this.composeMessageClick}
          />
          { this.state.composeMessageOpen && <ComposeMessage sendMessage={this.sendMessage} /> }
          <Messages messages={this.state.messages}
                    starChecked={this.starChecked}
                    checkboxChecked={this.checkboxChecked}
          />
      </div>
    );
  }
}

export default App;
