import React from 'react';
import './ShowModal.css';

class ShowModal extends React.Component {

    constructor(props) {
        super(props);
        // initialization code here
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    render () {
        return (
                <div id="dialog" className="modal-bg" aria-hidden="false" role="dialog">
                    <section className="modal">
                        <button 
                            className="close" 
                            aria-label="Close the modal window"
                            id="close-button"
                            onClick={this.props.closeModal}>
                                Close
                        </button>
                        
                        <div className="modal-body">
                            <span id="modal-comments">
                                <img id="modal_post" src={this.props.post.image_url}/>
                            
                                <div id="all-comments">
                                    <span>
                                        <img src={this.props.post.comments[0].user.thumb_url} alt="profile picture"/>
                                        <strong>{this.props.post.comments[0].user.username}</strong>
                                        <p>{this.props.post.comments[0].text}</p>
                                    </span>
                                    <span>
                                        <img src={this.props.post.comments[1].user.thumb_url} alt="profile picture"/>
                                        <strong>{this.props.post.comments[1].user.username}</strong>
                                        <p>{this.props.post.comments[1].text}</p>
                                    </span>
                                </div>
                            </span>
                        </div>
                    </section>
                </div>
        )
    }
}

export default ShowModal;