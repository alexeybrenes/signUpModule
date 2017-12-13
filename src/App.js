import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import SignUpModule from './components/SignUpModule';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <SignUpModule/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
