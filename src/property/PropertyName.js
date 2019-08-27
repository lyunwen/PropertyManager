import React from "react";
import { Card, Tag, Input, Tooltip, Icon } from "antd";


class PropertyName extends React.Component {
  state = {
    inputVisible: false,
    inputValue: '',
  };
  thisInput = null;
  inputShow = () => {
    this.setState({ inputVisible: true }, () => this.thisInput.focus());
  };
  render() {
    const { inputVisible, inputValue } = this.state
    const {
      propertyNameAdd,
      propertyNameDel,
      propertyNameList,
    } = this.props
    return (<Card title={<span>PropertyName Pool</span>} bordered={false} >
      {propertyNameList.map((propertyName) => {
        return <Tag closable={true} visible={true} onClose={() => propertyNameAdd(auth)} style={{ padding: '5px', margin: '5px' }}>
          {propertyName.name+"-"+propertyName.regex}
        </Tag>;
      })}
      {inputVisible && (
        <Input
          ref={(e) => this.thisInput = e}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={(e) => { this.setState({ inputValue: e.target.value }) }}
          onBlur={() => { authAdd(inputValue); this.setState({ inputValue: '', inputVisible: false }) }}
          onPressEnter={() => { authAdd(inputValue); this.setState({ inputValue: '', inputVisible: false }) }}
        />
      )}
      {!inputVisible && (
        <Tag onClick={this.inputShow} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> Add Auth
          </Tag>
      )}
    </Card>)
  }
}
export default PropertyName