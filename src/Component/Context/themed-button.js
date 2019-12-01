import React, { Component } from 'react';
import {ThemeContext} from './theme-context'

class ThemedButton extends Component {
    shouldComponentUpdate(){
        return false
    }
    render() { 
        return ( 
            <button {...this.props} style={{backgroundColor: this.context.color, color: '#61DAFB'}} />
         );
    }
}
ThemedButton.contextType = ThemeContext;
 
export default ThemedButton;