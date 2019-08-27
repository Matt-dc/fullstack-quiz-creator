import React from 'react'

export default function WarnDelete(props) {
    return (
        <div id="modal1" className="modal">
            <div className="modal-content center">
                <h5>Are you sure you want to delete this quiz?</h5>
            </div>
            <div className="modal-footer">
                <div className="row">
                <div className="col s8 m8"></div>
                    <div className="col m2 s2">
                        <a href="#" onClick={() => props.deleteQuiz()} className="btn">Delete</a>
                    </div>
                    <div className="col m2 s2">
                        <a href="#" className="btn modal-close">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
