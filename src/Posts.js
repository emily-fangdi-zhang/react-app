import React from 'react';
import {getHeaders} from './utils';
import Post from './Post';

class Posts extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
        this.state = {
            posts: []
        }
        this.getPostsFromServer()
    }

    getPostsFromServer () {
        fetch('https://photo-app-secured.herokuapp.com/api/posts', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                posts: data
            })
        })
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

     render () {
        return (
            <div id="posts">
                {
                    this.state.posts.map(post => {
                        console.log(post);
                        return (
                            <Post 
                                key={'post_' + post.id}
                                model={post}/>
                        )
                    })
                }
            </div>
        )
     }
}

export default Posts;