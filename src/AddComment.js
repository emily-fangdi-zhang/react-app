import React from 'react';
import {getHeaders} from './utils';

class AddComment extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            model: this.props.model,
            post: this.props.postId,
            value: '',
            comments: []
        };

        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshPostDataFromServer = this.refreshPostDataFromServer.bind(this);
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const url = 'https://photo-app-secured.herokuapp.com/api/comments';

        const postData = {
            post_id: this.state.post,
            text: this.state.value
        }

        fetch(url, {
            headers: getHeaders(),
            method: "POST",
            body: JSON.stringify(postData)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({value: ''})
            this.props.refreshPost();
        })
    }

    refreshPostDataFromServer () {
        const url = '/api/posts/' + this.state.post.id;
        fetch(url, {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                post: data
            })
        })
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          console.log('do validate');
        }
    }

    render () {
        const post = this.state.post;
        return (
            <section>
                 <form onSubmit={this.handleSubmit} className="add-comment">

                    <input 
                        type="text" 
                        value={this.state.value} 
                        onChange={this.handleChange} 
                        placeholder="Add a comment..."
                        className="input-holder"
                        ref={this.textInput}
                        onKeyDown={this._handleKeyDown}/>             
                        
                    <input 
                        type="submit" 
                        value="POST"
                        className="link"
                        onClick={this.focusTextInput}/>
                </form>
            </section>
            )
    }
}

export default AddComment;