import styled from "styled-components";
import Router  from "next/router";
export default ({ snips, tags, selectedSnip, onSelect }) => {    
  return (
    <ListBox>
      {
        snips === []  
          ? (
            <>No Snippets Found</>
          ) : (
            snips.map((s, i) => { 
              return (
                  <ListItem
                    key={s.id}
                    selected={i === selectedSnip}
                    tabIndex={i === selectedSnip ? 0 : 1}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        alert("selected" + i);
                      }
                    }}
                    onClick={() => {
                      onSelect(s.id)
                      var path = '/new?id=' + s.id;
                     Router.push(path)
                    }}
                  >
                    <div style={{ padding: ".12em" }}>{s.title}</div>
                    <TagWrapper>
                      {s.tags !== undefined
                        ? s.tags.map((p, it) => <Tag key={it} selected = {i === selectedSnip}>{p.id}</Tag>)
                        : null}
                    </TagWrapper>
                  </ListItem>
              );
            })
          )}
    </ListBox>
  )
};

const ListBox = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  /* width: 300px; */
  flex-direction: column;
`;
const ListItem = styled.li`
  padding: 0.5em;
  max-width: 400px;
  flex: 1;
  background: ${props => props.selected ? props.theme.secondary : "transparent" };
  color:${props=>props.theme.color};
  border-left: ${props => props.selected ? `2px solid ${props.theme.accent}` : "2px solid transparent"};
  outline: none;
  border-bottom: ${ props => {
    var text = '0.5px solid';
    var color = props.theme.secondary;
    return text + color
  }};
  a { 
    transition:all .5s ease;
    color: #fff;
    text-decoration: none;
  }
  &:hover,
  &:focus {
    background:${props=>props.theme.secondary};
    border-left: 2px solid #5D9E6B;
    outline: none; 
    transition:all .5s ease;
    a{
      background:${props=>props.theme.primary};
    }
  }
`;
//#0f1113;

const TagWrapper = styled.div`
  padding: 0.5em;
  span{
    background: ${ props => props.theme.secondary };
    color:${props=> props.theme.color};
    
  }
`;
const Tag = styled.span`
  padding: 0.32em;
  margin-left: 0.5em;
  background: ${ props => props.selected ? props.theme.primary : props.theme.secondary };
  color:${props=> props.theme.color};
  border-radius: 0.2em;
`;