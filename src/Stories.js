import React from 'react';
import {getHeaders} from './utils';
import Story from './Story';

class Stories extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
        this.state = {
            stories: []
        }
        this.getStoriesFromServer()
    }

    getStoriesFromServer () {
        fetch('https://photo-app-secured.herokuapp.com/api/stories', {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                stories: data
            })
        })
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

     render () {
        return (
            <header className="stories">
                {
                    this.state.stories.map(story => {
                        console.log(story);
                        return (
                            <Story 
                                key={'story_' + story.id}
                                model={story}/>
                        )
                    })
                }
            </header>
        )
     }
}

export default Stories;