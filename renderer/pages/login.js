import styled from "styled-components";
import Icon from "react-icons-kit";
import { mail, lock, info } from "react-icons-kit/feather";
import firebase from "./../config/firebase"; 
import { getUser, updateUser } from './../config/localstorage'

import Router from 'next/router'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: false,
            logging: false
        };
        this.FireLogin = this.FireLogin.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    componentDidMount() {
        const { user } = getUser(); 
        if (user.uid !== '') { 
            Router.push('/home')
        }
    }
    FireLogin = e => {
        e.preventDefault();
        this.setState({ logging: true })
        firebase
            .login(this.state.email, this.state.password)
            .then(( user ) => { 
                localStorage.setItem("uid", user.uid);
                localStorage.setItem("onboard", false);
                localStorage.setItem('theme','tomorrow_night')
                this.setState({ error: false });
                Router.push('/')
            })
            .catch(e => {
                this.setState({ error: e.message });
                this.setState({ logging: false })
            });
    };
    onInputChange(e) {
        const { target } = e;
        const { name, value } = target;
        this.setState({ [name]: value });
    }
    render() {
         
        // this.state.logging ? <div>loading</div> :
            return( 

                    <Wrapper>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M-9.61651e-07 2L0.000116366 1.97811L5 7.20876L5 19L16.271 19L21.0505 24L2 24C0.89543 24 -3.91403e-08 23.1046 -8.74225e-08 22L-9.61651e-07 2ZM19 6.82127L19 17.5269L23.8933 22.6461C23.9625 22.4434 24 22.2261 24 22L24 2C24 1.94223 23.9975 1.88504 23.9928 1.82852L19 6.82127ZM16.5786 5L21.5786 -9.43232e-07L2.24633 -9.81903e-08L7.02574 5L16.5786 5Z"
                                 fill="currentColor"
                            />
                        </svg>
                        <p style={{ fontSize: 24 }}>Snipcode</p>

                        <FormWrapper onSubmit={this.FireLogin}>
                            <Tab>Login</Tab>
                            <Input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                onChange={this.onInputChange}
                                value={this.state.email}
                                error={this.state.error}
                            />
                            <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                required
                                placeholder="Password"
                                error={this.state.error}
                            />
                            <input
                                type="submit"
                                style={{
                                    display: "inline-block",
                                    padding: 10,
                                    margin: 10,
                                    background: "#5d9e6b"
                                }}
                            />
                        </FormWrapper>
                        {this.state.error ? (
                            <span style={{ color: "red", padding: 10 }}>{this.state.error}</span>
                        ) : null}
                        <span>Don’t have an account ? Sign up </span>
                        <span style={{ position: "absolute", bottom: 0, fontSize: 12, padding: 5 }}>
                            You accept our terms of service and privacy
                         </span>
                    </Wrapper> 
            );
    }
}
export default Login;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.color};
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 345px;
  margin: 0 auto;
`;
const Tab = styled.span`
  font-size: 16px;
  padding: 10px 0px;
  &:after {
    content: "";
    position: relative;
    display: block;
    border-radius: 25px;
    left: 20px;
    top: 5px;
    height: 5px;
    width: 5px;
    background:#5d9e6b;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  background:${props=>props.theme.secondary};
  margin: 10px;
  border-radius: 5px;
  max-width: 400px;
`;
const IconWrapper = styled.span`
  padding: 10px;
`;
const InputWidget = styled.input`
  border: none;
  padding: 0px 10px;
  outline: none;
  background: transparent;
  color: inherit;
  flex: 1;
  &::placeholder {
    color: #aaa;
  }
`; 
const Input = props => (
    <InputWrapper>
        <IconWrapper>
            <Icon icon={props.name === "email" ? mail : lock} />
        </IconWrapper>
        <InputWidget {...props} />
        <IconWrapper>
            {props.error ? <Icon icon={info} style={{ color: "red" }} /> : null}
        </IconWrapper>
    </InputWrapper>
);