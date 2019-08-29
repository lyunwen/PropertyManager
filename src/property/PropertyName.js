import React from "react";
import { Card, Tag, Input, Tooltip, Icon } from "antd";


class PropertyName extends React.Component {
  state = {
    inputVisible: false,
    inputNameValue: '',
    inputRegexValue: '',
  };
  thisNameInput = null;
  thisRegexInput = null;
  inputShow = () => {
    this.setState({ inputVisible: true }, () => { this.thisNameInput.focus() });
  };
  render() {
    const {
      propertyNameAdd,
      propertyNameList,
    } = this.props
    return (<Card title={<span>属性名称 Pool</span>} bordered={false} >
      {propertyNameList.map((propertyName) => {
        return <Tag closable={false} visible={true} style={{ padding: '5px', margin: '5px' }}>
          {propertyName.name + "-" + propertyName.regex}
        </Tag>;
      })}
      {this.state.inputVisible && (
        <div>
          <Input
            ref={(e) => this.thisNameInput = e}
            placeholder="name"
            type="text"
            size="small"
            style={{ width: 78 }}
            value={this.state.inputNameValue}
            onChange={(e) => { this.setState({ inputNameValue: e.target.value }) }}
            onPressEnter={() => { propertyNameAdd(this.state.inputNameValue, this.state.inputRegexValue); this.setState({ inputVisible: false, inputNameValue: '', inputRegexValue: '' }) }}
          />
          <Input
            ref={(e) => this.thisRegexInput = e}
            placeholder="regex"
            type="text"
            size="small"
            style={{ width: 78 }}
            value={this.state.inputRegexValue}
            onChange={(e) => { this.setState({ inputRegexValue: e.target.value }) }}
            onPressEnter={() => { propertyNameAdd(this.state.inputNameValue, this.state.inputRegexValue); this.setState({ inputVisible: false, inputNameValue: '', inputRegexValue: '' }) }}
          />
        </div>
      )}
      {!this.state.inputVisible && (
        <Tag onClick={this.inputShow} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> add property name
          </Tag>
      )}
    </Card>)
  }
}
export default PropertyName