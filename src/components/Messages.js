import React, {Component}  from 'react';
import Message from './Message';

class Messages extends Component {
    render() {
        return (
            <div>
                {this.props.messages.map((message, i) => {
                      return  <Message key={i}
                                 id={message.id}
                                 subject={ message.subject }
                                 read={message.read}
                                 starred={message.starred}
                                 labels={message.labels}
                                 selected={message.selected}
                                 checkboxChecked={() => this.props.checkboxChecked(message.id)}
                                 starChecked={() => this.props.starChecked(message.id)}
                      />
                    }
                )
                }
            </div>
        )
    }
}

export default Messages;