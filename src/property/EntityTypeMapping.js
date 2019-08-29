import React from "react";
import { Card, Tag, Col, Row, Icon, Select, Button } from "antd";


class EntityTypeMapping extends React.Component {
  state = {
    propertyNameGroupSelectedItems: [],
    entityTypeSelectedItems: [],
  }
  render() {
    const {
      entityTypeList,
      propertyNameGroupList,
      mappingEntityType
    } = this.props
    return (<Card title={<span>实体\属性组映射</span>} bordered={false}>
      <Select
        mode="multiple"
        placeholder="Entity Type"
        value={this.state.entityTypeSelectedItems}
        onChange={(value) => { this.setState({ entityTypeSelectedItems: value }) }}
        style={{ width: '30%', margin: '5px' }}
      >
        {entityTypeList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        placeholder="Group"
        value={this.state.propertyNameGroupSelectedItems}
        onChange={(value) => { this.setState({ propertyNameGroupSelectedItems: value }) }}
        style={{ width: '30%', margin: '5px' }}
      >
        {propertyNameGroupList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={() => {
        mappingEntityType(this.state.entityTypeSelectedItems, this.state.propertyNameGroupSelectedItems);
        this.setState({
          entityTypeSelectedItems: [],
          propertyNameGroupSelectedItems: [],
        })
      }}>Mapping</Button> 
    </Card>)
  }
}
export default EntityTypeMapping