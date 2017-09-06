import React from 'react';

class ComposeMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            body: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const targetSubject = event.target.subject.value;
        const targetBody = event.target.body.value;

        this.setState({
            subject: targetSubject,
            body: targetBody
        });
    }

    render() {

    return (
        <form className="form-horizontal well" onSubmit={() => props.sendMessage()}>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label for="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"
                           value={this.state.subject}
                           onChange={this.handleInputChange}/>
                </div>
            </div>
            <div className="form-group">
                <label for="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body" id="body" className="form-control" value={this.state.body}
                              onChange={this.handleInputChange}></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary" />
                </div>
            </div>
        </form>
    );
    }
}

export default ComposeMessage;

