import Icon from 'react-icons-kit'
import { refreshCw  , uploadCloud, downloadCloud, trash, send , logOut} from 'react-icons-kit/feather'
import styled from 'styled-components'
const Row = ({ children, title, description, icon, onclick }) => {
  const desc = description >= 30 ? `${description.substr(0, 50)}...` : description
  let actionIcon
  switch (icon) {
    case 'import':
      actionIcon = (<Icon icon={uploadCloud} />);
      break;
    case 'export':
      actionIcon = (<Icon icon={downloadCloud} />);
      break;
    case 'trash':
      actionIcon = (<Icon icon={trash} />);
      break;
    case 'award':
      actionIcon = (<Icon icon={send} />);
      break;
    case 'signOut':
      actionIcon = (<Icon icon={logOut} />);
    case 'sync':
      actionIcon = (<Icon icon={refreshCw} />);
      break;
    default:
    // code
  }

  return (
    <List onClick={onclick}>
      <Indicator/>
      <Subli>
        <Title >{title}</Title>
        <Desc>{desc}</Desc>
      </Subli>
      {actionIcon}
     </List>
  )
}

export default Row;

const List = styled.li`
    cursor:pointer;
    user-select:none;
    display:flex;
    padding:10px;
    user-select:none;
`;
const Indicator  = styled.span`
    margin: 0px;
    border-radius: 25px;
    margin-top:1em;
    height: 5px;
    width: 5px;
    background: red;
`;

const Subli = styled.div`
      flex:1 0;
      display:flex;
      flex-direction:column;
      line-height:1em;
`;
const Title = styled.span`
    font-weight:600;
    padding:5px;
    font-size:1.1em;
`
const Desc = styled.span`
    color:#aaa;
    padding:5px;
    font-size:1em;
`;
