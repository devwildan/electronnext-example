import Icon from 'react-icons-kit'
import { x } from 'react-icons-kit/feather'
import styled from 'styled-components'
export default (props) => {
    return (
        <Wrapper style={{ position: 'fixed', top: '0px', height: '100%', width: '100%', background: '#000', zIndex: '99999' }}>
            <Icon icon={x} style={{ padding: "1em" }} onClick={() => props.close()} />
            list of all the shortcuts
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:fixed;
    top:0px;
    height:100%;
    width:100%;
    background:${props => props.theme.primary};
    z-index:99999;
    color:${props => props.theme.color};
    i{
        cursor:pointer;
    }
`