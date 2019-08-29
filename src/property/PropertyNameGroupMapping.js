import React from "react";
import { Card, Tag, Col, Row, Icon, Select, Button } from "antd";


class PropertyNameGroupMapping extends React.Component {
  state = {
    propertyNameGroupSelectedItems: [],
    propertyNameSelectedItems: [],
  }
  render() {
    const {
      propertyNameList,
      propertyNameGroupList,
      propertyNameMapping,
      propertyNameGroupMappingList
    } = this.props
    return (<Card title={<span>属性组\属性名映射</span>} bordered={false}>
      <Select
        mode="multiple"
        placeholder="Find Group"
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
      <Select
        mode="multiple"
        placeholder="Find User"
        value={this.state.propertyNameSelectedItems}
        onChange={(value) => { this.setState({ propertyNameSelectedItems: value }) }}
        style={{ width: '30%', margin: '5px' }}
      >
        {propertyNameList.map(item => (
          <Select.Option key={item.name} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={() => {
        propertyNameMapping(this.state.propertyNameSelectedItems, this.state.propertyNameGroupSelectedItems);
        this.setState({
          propertyNameGroupSelectedItems: [],
          propertyNameSelectedItems: [],
        })
      }}>Mapping</Button>

      <Row>
        <Col>
          {
            propertyNameGroupMappingList.map(item => <Tag style={{ padding: '5px', margin: '5px' }}>{item.propertyGroupName + "-" + item.propertyName}</Tag>)
          }
        </Col>
      </Row>
    </Card>)
  }
}
export default PropertyNameGroupMapping