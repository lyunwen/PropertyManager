import React from "react";
import { Card, Tag, Input, Tooltip, Icon } from "antd";


class PropertyNameGroup extends React.Component {
  state = {
    inputVisible: false,
    inputValue: '',
  };
  thisInput = null;
  thisRegexInput = null;
  inputShow = () => {
    this.setState({ inputVisible: true }, () => this.thisInput.focus());
  };
  render() {
    const { inputVisible, inputValue } = this.state
    const {
      propertyNameGroupList,
      propertyNameGroupAdd
    } = this.props
    return (<Card title={<span>属性组 Pool</span>} bordered={false} >
      {propertyNameGroupList.map((propertyNameGroup) => {
        return <Tag closable={false} visible={true} style={{ padding: '5px', margin: '5px' }}>
          {propertyNameGroup}
        </Tag>
      })}
      {inputVisible && (
        <div>
          <Input
            ref={(e) => this.thisInput = e}
            placeholder="name"
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={(e) => { this.setState({ inputValue: e.target.value }) }}
            onPressEnter={() => { propertyNameGroupAdd(this.state.inputValue); this.setState({ inputValue: '', inputVisible: false }) }}
          />
        </div>
      )}
      {!inputVisible && (
        <Tag onClick={this.inputShow} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> Add property
          </Tag>
      )}
    </Card>)
  }
}
export default PropertyNameGroup