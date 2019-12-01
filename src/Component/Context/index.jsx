import React, { Component, Fragment } from 'react';
import { ThemeContext, themes } from './theme-context'
import ThemedButton from './themed-button'

// 使用 ThemedButton 的中间组件，不传递参数，ThemedButton仍可从Context取值
function Toolbar(props) {
    return <ThemedButton onClick={props.changeTheme}>ThemedButtonProvider</ThemedButton>;
}
class Context extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: themes.light
        }
    }
    toggleTheme = () => {
        this.setState(state => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark
        }))
    }
    render() {
        return (
            <Fragment>
                <ThemeContext.Provider value={this.state.theme}>
                    <Toolbar changeTheme={this.toggleTheme} />
                </ThemeContext.Provider>
                <ThemedButton>ThemedButton</ThemedButton>
            </Fragment>
        );
    }
}

export default Context;