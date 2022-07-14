import React from 'react';

class Story extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
        this.state = {
            story: props.model
        }
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    render () {
        const story = this.state.story;
        return (
            <div>
                <img className="pic" src={story.user.thumb_url}/>
                <p>{story.user.username}</p>
            </div>
        )
    }
}

export default Story;