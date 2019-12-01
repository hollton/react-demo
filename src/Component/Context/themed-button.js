import React, { Component } from 'react';
import {ThemeContext} from './theme-context'

// Consumer 订阅 context
// way one: class 组件
class ThemedButton extends Component {
    shouldComponentUpdate(){
        // 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数
        return false
    }
    render() { 
        return <button {...this.props} style={{backgroundColor: this.context.color, color: '#61DAFB'}} />;
    }
}
ThemedButton.contextType = ThemeContext;

// way two: 函数式组件
// const ThemedButton = (props) => {
//     return <ThemeContext.Consumer>
//             {
//                 theme => {
//                     return <button {...props} style={{backgroundColor: theme.color, color: '#61DAFB'}} />
//                 }
//             }
//     </ThemeContext.Consumer>
// }
 
export default ThemedButton;