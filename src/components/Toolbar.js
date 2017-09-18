import React, {Component} from "react";


class Toolbar extends Component {

    render() {
        let hasSelectedMesssage = this.props.messages.length > 0 && this.props.messages.filter(message => {
            return message.selected
        })

        if(hasSelectedMesssage.length <= 0){
            hasSelectedMesssage = false;
        }
        else
        {
            hasSelectedMesssage = true;
        }

        return (
            <div className="row toolbar">
                <div className="col-md-12">

                    <p className="pull-right">
                        <span className="badge badge">{this.props.numUnreadMessages}</span>
                        {this.props.numUnreadMessages === 1 ? "unread message" : "unread messages"}
                    </p>

                    <a className="btn btn-danger" onClick={this.props.onComposeMessageClick}>
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default" onClick={this.props.onSelectAllClick}>
                        <i className={this.props.selectAllStyle}></i>
                    </button>

                    <button className="btn btn-default" onClick={this.props.onReadButtonClick} disabled={!hasSelectedMesssage}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={this.props.onUnReadButtonClick} disabled={!hasSelectedMesssage}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" disabled={!hasSelectedMesssage}
                            onChange={(e) => this.props.onLabelAdded(e)}
                            >
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select"
                            disabled={!hasSelectedMesssage}
                            onChange={(e) => this.props.removeLabelClick(e)}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={this.props.onTrashClick} disabled={!hasSelectedMesssage}>
                        <i className="fa fa-trash-o"></i>
                    </button>

                </div>


            </div>

        );
    }
}
export default Toolbar;
