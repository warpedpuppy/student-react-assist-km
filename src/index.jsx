import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component
class SuperFlixApplication extends React.Component {
    render() {
        return (
          <div className="super-flix">
            <div>Good morning</div>
          </div>
        );
    }
}

// Finds  the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(SuperFlixApplication), container);
