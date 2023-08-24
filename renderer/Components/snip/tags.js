import { Component } from 'react';

import styled from 'styled-components';

import Input from './../Input'

class tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagValue: "",
            tags: props.tags ? props.tags : []
        }; 
    }
    onEnter = (e) => {
        var tags = this.state.tags;
        if (e.key === "Enter" && this.state.tagValue !== " ") {
            var id = this.state.tagValue
                .split(/[ ,]+/)
                .join("_")
                .toUpperCase();
            var tag = { name: this.state.tagValue.toUpperCase(), id: id };
            var x =
                tags.length === 0
                    ? tags.push(tag)
                    : tags.find(t => {
                        return tag.id === t.id;
                    })
                        ? null
                        : tags.push(tag);
            this.setState({ tags: tags, tagValue: "" });
            return x;
        }
        if (e.key === "Backspace" && this.state.tagValue === "") {
            tags.pop();
            this.setState({ tags: tags });
        }
        
        this.props.onChangeTag(tags)
    }
    onChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        this.setState({ [name]: value });
    }
    removeTag = (i) => {
        const tags = this.state.tags.filter(t => {
            return t.id !== i ? t : null;
        });
        this.setState({ tags: tags });
        this.props.onChangeTag(tags)
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                {this.state.tags ? (
                    <TagsUL>
                        {
                            this.state.tags.map((t, i) => (
                                <Tag key={i}>
                                   <span>{t.name}</span> 
                                    <TabIndicator
                                        selected={true}
                                        onClick={() => {
                                            this.removeTag(t.id);
                                        }}
                                    />
                                </Tag>
                            ))}
                    </TagsUL>
                ) : null}
                <Input
                    name="tagValue"
                    placeholder="Add new Tag"
                    type="text"
                    style={{ flex: 1, padding: "5px",background:'transparent' }}
                    onKeyDown={this.onEnter}
                    onChange={this.onChange}
                    value={this.state.tagValue}
                />
            </div>
        );
    }
}

export default tags;

const TagsUL = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  margin: 2px;
`;
//  #080a0b
const Tag = styled.li`
  display: flex;
  flex-direction: row;
  background:${props => props.theme.secondary};
  border-radius: 0.5em; 
  margin: 0.3em;
  span{
      padding:0.5em;
      flex:1
  }
`;
const TabIndicator = styled.i`
  display: block;
  height: 0.5em;
  width: 0.5em;
  margin: 0.5em;
  border-radius: 0.3em;
  cursor: pointer; 
  background: ${props => (props.selected ? props.theme.accent : "transparent")};
`;
// "#87C895"