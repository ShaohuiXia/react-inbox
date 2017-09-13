import React from 'react';

const Message = ({
    id,
    subject,
    read,
    selected,
    starred,
    labels,
    checkboxChecked,
    starChecked
}) => {
    var readStyle = ''
    var selectStyle = ''
    if (read) {
        readStyle = "read"
    }
    else {
        readStyle = "unread"
    }

    if (selected) {
        selectStyle = "selected"
    }

  var displayLabel = labels.map((label,i) => (
        <span className="label label-warning" key={i}>{label}</span>
    )
  )

    return (
        <div className={`row message ${readStyle} ${selectStyle}`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                            <input type="checkbox" checked={selected || false} onChange={checkboxChecked}/>
                    </div>
                    <div className="col-xs-2" onClick={starChecked}>
                            <i className={starred ? "star fa fa-star" : "star fa fa-star-o"}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {displayLabel}
                {subject}
            </div>

        </div>
    )
}

export default Message;