import React, {Component,PropTypes}  from 'react';
import Message from './Message';

class Messages extends Component {
    // static propTypes = {
    //     messages: PropTypes.array,
    //     checkboxChecked: PropTypes.func,
    //     starChecked: PropTypes.func
    // }
    // constructor(props) {
    //     super(props);
    // }

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