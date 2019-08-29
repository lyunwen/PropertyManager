import React from "react";
import { Card, Tag, Input, Tooltip, Icon, Select, Button } from "antd";


class PropertyNameGroupMapping extends React.Component {
  state={
    propertyNameGroupSelectedItems:[],
    propertyNameSelectedItems:[],
  }
  render() {
    const {
      propertyNameList,
      propertyNameGroupList,
      propertyNameMapping
    } = this.props
    return (<Card title={<span>Mapping</span>} bordered={false}>
      <Select
        placeholder="Find Group"
        value={this.state.propertyNameGroupSelectedItems}
        onChange={(value)=>{this.setState({propertyNameGroupSelectedItems:value})}}
        style={{ width: '30%', margin: '5px' }}
      >
        {propertyNameGroupList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        placeholder="Find User"
        value={this.state.propertyNameSelectedItems}
        onChange={(value)=>{this.setState({propertyNameSelectedItems:value})}}
        style={{ width: '30%', margin: '5px' }}
      >
        {propertyNameList.map(item => (
          <Select.Option key={item.name} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={propertyNameMapping}>Mapping</Button>
    </Card>)
  }
}
export default PropertyNameGroupMapping