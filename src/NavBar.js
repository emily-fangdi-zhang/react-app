import React from 'react';

class NavBar extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
        console.log("NavBar props:", props )
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

     render () {
        return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1>

                <ul>
                    <li><button className="link"><a>API Docs</a></button></li>
                    <li>{this.props.username}</li>
                    <li><button className="link"><a>Sign out</a></button></li>
                </ul>
                {/* Navigation Links */}
            </nav>
        )
     }
}

export default NavBar;