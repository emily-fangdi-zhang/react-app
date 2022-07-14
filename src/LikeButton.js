import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here

        this.toggleLike = this.toggleLike.bind(this);
        this.createLike = this.createLike.bind(this);
        this.removeLike = this.removeLike.bind(this);
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleLike () {
        console.log('hello');
        if(this.props.likeId) {
            this.removeLike();
        
        } else {
            this.createLike();
        }
    }

    createLike () {
        // fetch POST: /api/posts/likes
        const url = 'https://photo-app-secured.herokuapp.com/api/posts/likes';
        
        const postData = {
            post_id: this.props.postId
        }

        console.log('create like:', url);

        fetch(url, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(response => response.json())
        .then(data => {
            // this needs to trigger a post redraw
            console.log(data);

            this.props.refreshPost();
        })
    }

    removeLike () {
        // fetch DELETE: /api/posts/likes{likeId}
        const url = 'https://photo-app-secured.herokuapp.com/api/posts/likes/' + this.props.likeId;
        console.log('remove like:', url);

        fetch(url, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            // this needs to trigger a post redraw
            console.log(data);
            this.props.refreshPost();
        })
    }

    render () {
        const likeId = this.props.likeId;
        const heartClass = (likeId ? 'fas' : 'far') + ' fa-heart';
        const aria_checked = (likeId ? true : false);
        return (
            <button 
                onClick={this.toggleLike}
                aria-label="Like / Unlike"
                aria-checked={aria_checked}
                className="like">
                <i className={heartClass}></i>
            </button>
        )
    }
}

export default LikeButton;