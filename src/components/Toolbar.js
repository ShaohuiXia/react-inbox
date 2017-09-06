import React, {Component, PropTypes} from "react";
import ComposeMessage from './ComposeMessage';


class Toolbar extends Component {
    // static propTypes = {
    //     onReadButtonClick: PropTypes.func,
    //     onUnReadButtonClick: PropTypes.func,
    //     onAddLabelClick: PropTypes.func,
    //     onRemoveLabelClick: PropTypes.func,
    //     onSelectAllClick: PropTypes.func,
    //     onLabelAdded: PropTypes.func,
    //     removeLabelClick: PropTypes.func,
    //     onTrashClick: PropTypes.func,
    //     selectAllSelected:PropTypes.string
    // }
    //
    // constructor(props){
    //     super(props)
    // }

    render() {
        console.log("888=" + this.props.selectAllSelected)
        return (
            <div className="row toolbar">
                <div className="col-md-12">

                    <p className="pull-right">
                        <span className="badge badge">{this.props.numUnreadMessages}</span>
                        {this.props.numUnreadMessages == 1 ? "unread message" : "unread messages"}
                    </p>

                    <a className="btn btn-danger" onClick={this.props.onComposeMessageClick}>
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default" onClick={this.props.onSelectAllClick}>
                        <i className={this.props.selectAllSelected}></i>
                    </button>

                    <button className="btn btn-default" onClick={this.props.onReadButtonClick}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={this.props.onUnReadButtonClick}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" onChange={(e) => this.props.onLabelAdded(e)}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" onChange={(e) => this.props.removeLabelClick(e)}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={this.props.onTrashClick}>
                        <i className="fa fa-trash-o"></i>
                    </button>

                </div>


            </div>

        );
    }
}
export default Toolbar;
