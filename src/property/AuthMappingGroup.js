import React from "react";
import { Card, Tag, Input, Tooltip, Icon, Select, Button } from "antd";


class AuthGroupMapping extends React.Component {
  render() {
    const {
      authList,
      groupList,

      authMappingAuthSelectedItems,
      updateAuthMappingAuthSelectedItems,
      authMappingGroupSelectedItems,
      updateAuthMappingGroupSelectedItems,
      mappingAuth
    } = this.props
    return (<Card title={<span>Auth Mapping Group</span>} bordered={false}>
      <Select
        mode="multiple"
        placeholder="Find Group"
        value={authMappingGroupSelectedItems}
        onChange={updateAuthMappingGroupSelectedItems}
        style={{ width: '30%', margin: '5px' }}
      >
        {groupList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        placeholder="Find Auths"
        value={authMappingAuthSelectedItems}
        onChange={updateAuthMappingAuthSelectedItems}
        style={{ width: '30%', margin: '5px' }}
      >
        {authList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={mappingAuth}>Mapping</Button>
    </Card>)
  }
}
export default AuthGroupMapping