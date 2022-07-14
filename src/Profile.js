import React from 'react';

class Profile extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

     render () {
        return (
            <header>
                <span className="profile">
                    <img src={this.props.thumb_url} alt="profile picture for current user"/>
                    <h1>{this.props.username}</h1>
                 </span>
            </header>
        )
     }
}

export default Profile;