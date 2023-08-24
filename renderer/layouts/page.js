import { Component } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Router from 'next/router'
import Progress from 'nprogress'

// Global Styles
const GlobalStyle = createGlobalStyle`
html,body{
  margin:0;
  padding:0;  
  position:relative;
  height:100%;
  width:100%;
}
#__next{
  padding:0;
  margin:0;
  display:flex;
  height:100%;
  width:100%;
  font-family:monospace;
}
input[type="submit"] {
      padding: 5px 15px;
      background: #ccc;
      border: 0 none;
      cursor: pointer;
      -webkit-border-radius: 5px;
      border-radius: 5px;
    }
    a{
      text-decoration:none;
      color:inherit;
      outline:none;
    }
    .themeChanger{
        position:absolute;
        top:0px;
        right:0px;
        border:none;
        background:transparent;
        z-index:999999
    }
    
    #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: #5d9e6b;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #5d9e6b, 0 0 5px #5d9e6b;
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
`;

let progress
const stopProgress = () => {
    clearTimeout(progress)
    Progress.done()
}

Router.onRouteChangeStart = () => {
    progress = setTimeout(Progress.start, 200)
}

Router.onRouteChangeComplete = stopProgress
Router.onRouteChangeError = stopProgress

const light = {
    color: '#25282c',
    primary: '#eee',
    secondary: '#fff',
    accent: '#5d9e6b'
};
const dark = {
    color: '#eee',
    primary: '#25282c',
    secondary: '#181a1d',
    accent: "#5d9e6b"
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            selectedTheme: 'light',
            theme: {}
        }
        if (this.state.selectedTheme.theme === 'light') {
            this.state.theme = light
        }
        else {
            this.state.theme = dark
        }
        this.handleKeypress = this.handleKeypress.bind(this)
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeypress, true)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeypress, true)
    }

    handleKeypress(event) {  
    if (event.altKey  && event.keyCode === 78 ) { 
      return Router.push({
        pathname: '/new'
      })
    }
    if (event.altKey && event.keyCode === 83 ) { 
      return Router.push({
        pathname: '/settings'
      })
    }
    
    if (event.altKey && event.keyCode === 37 ) { 
      return Router.push({
        pathname: '/home'
      })
    }
}


    render() {
        const { children } = this.props;
        return (
            <>
                <ThemeProvider theme={this.state.theme}>
                    <GlobalStyle />
                    {children}
                </ThemeProvider>
            </>
        )
    }
}
export default Page