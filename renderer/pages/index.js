import { Component } from 'react';
import styled from 'styled-components'
import Router from 'next/router' 

import {getUser} from './../config/localstorage'
class Onboard extends Component {
    constructor() {
        super();
        this.state = { user:[] };
    }
    componentDidMount(){ 
        const { user } = getUser();   
        if(user.uid === ''){
            Router.push('/login')
        }
        else {
            const onboard = localStorage.getItem('onboard'); 
            if(onboard === "false"){
                localStorage.setItem('onboard',true)
            } 
            else{
                Router.push('/home')
            }
        }
    } 
    render() {
        return (
            <Wrapper>
                <h1>Hey</h1>
                <h3>Welcome to snipcode!</h3>
                <h5>A simple snippet manager on menubar</h5>
                <LinkWrapper ><span onClick={()=>Router.push('/home')}>Get Started</span></LinkWrapper>
            </Wrapper>
        );
    }
}
export default Onboard;
const Wrapper = styled.div`
    background:${props=>props.theme.primary};
    color:${props=>props.theme.color};
    display: flex;
    text-align: center;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction:column
`
const LinkWrapper = styled.a` 
    cursor:pointer;
    background:#eee;
    color:#222;
    padding:10px 20px;
`