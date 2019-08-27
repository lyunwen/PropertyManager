import React from "react";
import { Card, Tag, Input, Tooltip, Icon, Select, Button } from "antd";


class PropertyNameGroupMapping extends React.Component {
  render() {
    const {
      propertyNameList,
      propertyNameGroupList,

      propertyNameSelectedItems,
      updatePropertyNameSelectedItems,
      propertyNameGroupSelectedItems,
      updatePropertyNameGroupSelectedItems,
      mappingUser
    } = this.props
    return (<Card title={<span>Mapping</span>} bordered={false}>
      <Select
        mode="multiple"
        placeholder="Find Group"
        value={propertyNameSelectedItems}
        onChange={updatePropertyNameSelectedItems}
        style={{ width: '30%', margin: '5px' }}
      >
        {propertyNameList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        placeholder="Find User"
        value={propertyNameGroupSelectedItems}
        onChange={updatePropertyNameGroupSelectedItems}
        style={{ width: '30%', margin: '5px' }}
      >
        {propertyNameGroupList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={mappingUser}>Mapping</Button>
    </Card>)
  }
}
export default PropertyNameGroupMapping