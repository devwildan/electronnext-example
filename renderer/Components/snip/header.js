import React, { Component } from 'react';
import Router from 'next/router'

import styled from 'styled-components';

import Input from './../Input'
import Logo from './../logo'

import Icon from 'react-icons-kit'
import {   arrowLeft, trash } from 'react-icons-kit/feather'
import { x } from 'react-icons-kit/feather';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: true,
            editProject: false,
            snipTitle: props.title
        };
        this.textInput = React.createRef();
    }
    componentDidMount() {
        // debugger
        // this.textInput.current.focusTextInput();
    }
    onChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        this.setState({ [name]: value });
    }
    onKeyDown = (e) => {
        if (e.key === "Enter") {
            this.props.changeTitle(this.state.snipTitle, this.state.project);
            this.setState({ editTitle: false, snipTitle: this.state.snipTitle });
        }
    }
    render() {
        return (
            <HeaderWrapper>
                <Button onClick={() => {
                    this.props.onSave();
                }}>
                    <Icon icon={arrowLeft} />
                </Button>
                {/* {this.state.editTitle ? */}
                <Input
                    name="snipTitle"
                    style={{ flex: 1, margin: 0, textAlign: 'center', background: 'transparent', border: '1px solid #555' }}
                    placeholder="Enter Snippet Title"
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                    onBlur={() => {
                        this.setState({ editTitle: !this.state.editTitle });
                        this.props.changeTitle(
                            this.state.snipTitle
                        );
                        if (this.state.snipTitle.length === 0 || this.state.snipTitle === ' ')
                            this.setState({ snipTitle: 'untitled' })
                    }}
                    value={this.state.snipTitle} 
                />
                {/* :
                     <Button
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => {
                        // this.textInput.current.focus();
                        this.setState({ editTitle: !this.state.editTitle })
                    }}
                    tooltip="Click to edit the title"
                >
                    {this.state.snipTitle}
                </Button> } */}
                    {
                    this.props.new ?
                        <Button onClick={() => Router.push('/home')}>
                            <Icon icon={x} />
                        </Button>
                        :
                        <Button onClick={() => this.props.removeSnip()}>
                            <Icon icon={trash} />
                        </Button>
                }
            </HeaderWrapper>
        );
    }
}

export default Header;
const HeaderWrapper = styled.header` 
  display: flex;
  text-align: center; 
  text-align:center;
  padding:5px;
`;
const Button = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  outline: none;
`;