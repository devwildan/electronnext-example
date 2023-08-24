import Router from "next/router";

import styled from "styled-components";
import mouseTrap from "mousetrap"; 

import Icon from "react-icons-kit";
import {plus} from 'react-icons-kit/feather'

import {Header,Commands} from './../Components/Home'
import Snippets from "./../Components/snippets";
import Input from "./../Components/Input";

import { getUser } from './../config/localstorage'
 
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            snips: [],
            tags: [],
            dialog: false,
            activetab: "snippets",
            selectedSnipID: -1,
            searchTerm: "",
            command: false
        };
        this._nextSnip = this._nextSnip.bind(this);
        this._prvSnip = this._prvSnip.bind(this);
    }

    componentDidMount() {
        // Check if user exists  
        const { user } = getUser(); 
        if (!user.uid) {
            Router.push("/login");
        } 
        // Onboard user for the first time
        const onboard = localStorage["onboard"];
        if (onboard === "false") { 
            Router.push("/"); 
        } 
        // get userdata from firestore to display the list
        this.setState({ user: user, tags: user.tags, snips: user.snips });
        // initialize the keyboard shortcuts 
        // mouseTrap.bind(["down", "alt+r"], this._nextSnip);
        // mouseTrap.bind(["up", "alt+r"], this._prvSnip);
        // mouseTrap.bind(["enter", "alt+l"], () => { 
        //     Router.push("/new?id=" + this.state.snips[this.state.selectedSnipID].id);
        // });
    }
    componentWillUnmount() {
        // mouseTrap.unbind(["left", "alt+l"], this.lefttab);
        // mouseTrap.unbind(["enter", "alt+l"], this._gotoSnip);
    }
    _nextSnip() {
        this.setState({
            selectedSnipID:
                this.state.selectedSnipID === this.state.user.snips.length - 1
                    ? this.state.user.snips.length - 1
                    : this.state.selectedSnipID + 1
        });
    }
    _prvSnip() {
        this.setState({
            selectedSnipID:
                this.state.selectedSnipID !== 0 ? this.state.selectedSnipID - 1 : 0
        });
    }
    // Key bindings
    onChange = e => {
        const { target } = e;
        const { name, value } = target;
        this.setState({ [name]: value });
        // debugger
        if (name === 'searchTerm') {
            this.filteredList(value);
        }
    };

    filteredList = (value) => { 
        if (!value) {
            this.setState({ snips: this.state.user.snips });
            return;
        }
        const _snips = this.state.user.snips.length > 0 && this.state.user.snips.filter(snip => {
            // debugger
            if (snip.title.toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
            if (snip.tags && snip.tags.length > 0) {
                const _tags = snip.tags.filter((s) => {
                    if (s.id.toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                })
                if (_tags.length > 0) {
                    return snip
                }
            }
        })
        this.setState({ snips: _snips })
    }
    render() {
        return (
            <Wrapper>
                <Header {...this.props} />
                <section style={{ flex: 1, maxWidth: '400px' }}>
                    <Input
                        search
                        type="search"
                        placeholder="Search for tags or snippets"
                        icon="search"
                        name="searchTerm"
                        onChange={this.onChange}
                        value={this.state.searchterm}
                        style={{ position: "sticky", top: '0px' }}
                        Commands={() => this.setState({ command: !this.state.command })}
                    />
                   { 
                    this.state.snips.length > 0 ?  
                     <Snippets
                        snips={this.state.snips}
                        tags={this.state.tags}
                        selectedSnip={this.state.selectedSnipID}
                        onSelect={id => this.setState({ selectedSnip: id })}
                    /> :
                    <NoSnip>Click on Add icon to start creating snippets</NoSnip>}
                    {this.state.command && <Commands close={() => this.setState({ command: false })} />}
                </section> 
                    <Icon icon={plus}  style={{
                            position: "fixed",
                            zIndex: 999,
                            padding: 15,
                            background: "#5D9E6B",
                            borderRadius: "5em",
                            bottom: 5,
                            right: 10,
                            color: "#222"
                        }}
                        onClick={()=>{Router.push('/new')}}/>  
            </Wrapper>
        );
    }
}
 

// styles
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: fixed;
  background:${props=>props.theme.primary};
  color:${props=>props.color};
`;
export default Home;

const NoSnip = styled.div`
    display:flex;
    height:70%;
    flex:1;
    justify-content:center;
    align-items:center;
    color:${props=>props.theme.color};
`;

// background: ${props => console.log(props.theme)};