import { Component } from 'react';
import Router from 'next/router'
import styled from 'styled-components'

import {
    Header,
    Editor
} from './../Components/snip'
import Tags from './../Components/snip/tags'
import { getUser, addSnip, updatesnip, removeSnip } from './../config/localstorage'
class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            snip: {
                title: 'untitled',
                code: '',
                tags: [],
                language: 'java',
                trash: false,
                theme:'tomorrow_night'
            }
        }; 
         
        if (Router.router !== null) {
            const id = Router.router.query.id;
            if (id !== undefined) {
                const { user } = getUser();
                const { snips } = user;
                var snip = {};
                snips.map((s) => { if (s.id === id) { snip = s } });
                this.state.snip = snip ;
            }
            else {
                this.state.new = true ; 
            }
        }
    }
    componentDidMount() {
        const theme = localStorage.getItem('theme');
        this.setState({theme:theme})
    }
    changeTitle = (title) => {
        const snip = this.state.snip;   
        if(title.length === 0) title = 'untitled'
        if (title !== ' ') {
            snip.title = title;
            this.setState({ snip: snip });
        }
    }
    onSave = async () => { 
        if (this.state.new) {
           await addSnip(this.state.snip).then(() => Router.push('/home'));
        }
        else {
            updatesnip({ id: this.state.snip.id, newsnip: this.state.snip }).then(() => {
                Router.push('/home')
            });
        }
 
    }
    removeSnip = ()=>{
            removeSnip(this.state.snip.id).then(()=>{
                alert('snippet deleted');
                Router.push('/home');
            });
    }
    render() {
        return (
            <Wrapper>
                <Header
                    title={this.state.snip.title}
                    changeTitle={this.changeTitle}
                    onSave={this.onSave}
                    removeSnip={this.removeSnip}
                    new={this.state.new}
                />
                <Tags
                    onChangeTag={(tags) => {
                        const { snip } = this.state;
                        snip.tags = tags;
                        this.setState({ snip: snip })
                    }}
                    tags={this.state.snip.tags}
                />
                <Editor
                    code={this.state.snip.code}
                    theme = {this.state.theme}
                    language={this.state.snip.language}
                    onDataChange={(code, language) => {
                        var snip = this.state.snip;
                        snip.language = language;
                        snip.code = code;
                        this.setState({ snip: snip });
                    }}
                />
            </Wrapper>
        );
    }
}

export default New;
//#25282c
const Wrapper = styled.div`
background:${props => props.theme.primary} ;
height: 100%;
width: 100%;
color: ${props => props.theme.color};
display:flex;
flex-direction:column;
`