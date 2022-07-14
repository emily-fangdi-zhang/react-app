import React from 'react';
import {getHeaders} from './utils';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import ShowModal from './ShowModal';

class Post extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
        this.state = {
            post: props.model,
            hideModal: true
        }
        this.refreshPostDataFromServer = this.refreshPostDataFromServer.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    closeModal () {
        console.log("closeModal")
        this.setState({
            hideModal: true
        })
    }

    displayModal () {
        console.log("displayModal")
        this.setState({
            hideModal: false
        })
    }

    refreshPostDataFromServer () {
        const url = 'https://photo-app-secured.herokuapp.com/api/posts/' + this.state.post.id;
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

    render () {
        const post = this.state.post;
        const likeClass = (post.likes.length === 0 | post.likes.length === 1 ? ' like' : ' likes');

        let comment;

        if (post.comments.length === 0) {
            comment = <></>
        }
        
        else if (post.comments.length === 1){
            comment = (
                <section>
                    <p className="comments"> 
                        <strong>{post.comments[post.comments.length - 1].user.username}</strong>
                        {post.comments[post.comments.length - 1].text}
                    </p>
                    <p className="timestamp">
                        {post.comments[post.comments.length - 1].display_time}
                    </p>
                </section>
            )
        }

        else{
            comment = (
                <section>
                <button 
                    className="link commentClass"
                    onClick={this.displayModal}>
                    View all {post.comments.length} comments
                </button>
                <p className="comments"> 
                    <strong>{post.comments[post.comments.length - 1].user.username}</strong>
                    {post.comments[post.comments.length - 1].text}
                </p>
                <p className="timestamp">
                    {post.comments[post.comments.length - 1].display_time}
                </p>
                </section>
            )
        }

        return (
            <div>
            {this.state.hideModal === false ? <ShowModal closeModal={this.closeModal} post={this.state.post}/> : <></>}
            <section 
                className="card">
                <h2 className="header">{post.user.username}</h2>
                <img src={post.image_url}/>
                
                <span className="buttons">
                    <span id="icon">
                        <LikeButton 
                            likeId={post.current_user_like_id}
                            postId={post.id}
                            refreshPost={this.refreshPostDataFromServer}/>
  
                        <button className="plane">
                            <i className="far fa-comment"></i>
                        </button>
                        <button className="plane">
                            <i className="far fa-paper-plane"></i>
                        </button>
                    </span>
                    
                    <BookmarkButton 
                        bookmarkId={post.current_user_bookmark_id}
                        postId={post.id}
                        refreshPost={this.refreshPostDataFromServer}/>
                </span>

                <p className="likes">
                    <strong>{post.likes.length}{likeClass}</strong>
                </p>
                
                <p className="caption">
                    <strong>{post.user.username}</strong>
                    {post.caption}</p>

                <p className="timestamp">
                    {post.display_time}
                </p>
                
                {comment}

                <AddComment
                    model={post}
                    postId={post.id}
                    refreshPost={this.refreshPostDataFromServer}/>
            </section>
            </div>
        )
    }
}

export default Post;