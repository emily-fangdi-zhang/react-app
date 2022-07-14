import React from 'react';
import {getHeaders} from './utils';

class Suggestion extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
        this.state = {
            suggestion: this.props.model,
            followingId: null
        }

        this.toggleFollow = this.toggleFollow.bind(this)
        this.followUser = this.followUser.bind(this)
        this.unfollowUser = this.unfollowUser.bind(this)
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleFollow () {
        if(this.state.followingId) {
            this.unfollowUser();
        
        } else {
            this.followUser();
        }
    }

    followUser () {
        const url = "https://photo-app-secured.herokuapp.com/api/following/"
        
        const followData = {
            user_id: this.state.suggestion.id
        }

        fetch(url, {
            headers: getHeaders(),
            method: "POST",
            body: JSON.stringify(followData)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                followingId: data.id
            })
        })
    }

    unfollowUser () {
        const url = 'https://photo-app-secured.herokuapp.com/api/following/' + this.state.followingId;

        fetch(url, {
            headers: getHeaders(),
            method: "DELETE"
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                followingId: null
            })
        })
    }

    render () {
        const suggestion = this.state.suggestion;
        const followClass = this.state.followingId ? "unfollow": "follow";
        const aria_checked = (this.state.followingId ? true : false);
        return (
            <section>
                <img className="pic" src={suggestion.thumb_url} alt={suggestion.username + "'s profile picture"}/>
                <div>
                    <p>{suggestion.username}</p>
                    <p>suggested for you</p>
                </div>
                <button 
                    className="follow" 
                    aria-label="Follow / Unfollow" 
                    aria-checked={aria_checked}
                    onClick={this.toggleFollow}>
                        {followClass}
                </button>
            </section>
        )
    }
}

export default Suggestion;