import React from "react";
import { Card, Tag, Input, Tooltip, Icon, Select, Button, Row, Col } from "antd";



class Mapping extends React.Component {
 

  render() {
    let {
      authList,
      userList,
      groupList,

      userMappingGroupList,
      authMappingGroupList,

      mixMappingUserSelectedItems,
      updateMixMappingUserSelectedItems,
      mixMappingAuthSelectedItems,
      updateMixMappingAuthSelectedItems,
      mixMappingGroupSelectedItems,
      updateMixMappingGroupSelectedItems,

      mappingAuthD,
      mappingUserD,
    } = this.props

    if (mixMappingUserSelectedItems.length > 0) {
      userMappingGroupList = userMappingGroupList.filter(x => mixMappingUserSelectedItems.includes(x.user))
    }
    if (mixMappingAuthSelectedItems.length > 0) {
      authMappingGroupList = authMappingGroupList.filter(x => mixMappingAuthSelectedItems.includes(x.auth))
    }
    if (mixMappingGroupSelectedItems.length > 0) {
      userMappingGroupList = userMappingGroupList.filter(x => mixMappingGroupSelectedItems.includes(x.group))
      authMappingGroupList = authMappingGroupList.filter(x => mixMappingGroupSelectedItems.includes(x.group))
    }

    let thisUserMappingAuthList = new Array()
    if (userMappingGroupList.length > 0 && authMappingGroupList.length > 0) {
      for (let i = 0; i < userMappingGroupList.length; i++) {
        thisUserMappingAuthList.push({ user: userMappingGroupList[i].user, group: userMappingGroupList[i].group, auth: null })
      }
      while (thisUserMappingAuthList.length && thisUserMappingAuthList[0].auth == null) {
        var existInfos = authMappingGroupList.filter(x => x.group == thisUserMappingAuthList[0].group)
        if (existInfos.length > 0) {
          for (let j = 0; j < existInfos.length; j++) {
            thisUserMappingAuthList.push({ user: thisUserMappingAuthList[0].user, group: thisUserMappingAuthList[0].group, auth: existInfos[j].auth })
          }
        }
        thisUserMappingAuthList.splice(0, 1)
      }
    }


    return (<Card title={<span>Auth Mapping Group</span>} bordered={false}><Select
      mode="multiple"
      placeholder="Find User"
      value={mixMappingUserSelectedItems}
      onChange={(values) => { updateMixMappingUserSelectedItems(values) }}
      style={{ width: '30%', margin: '5px' }}
    >
      {userList.map(item => (
        <Select.Option key={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
      <Select
        mode="multiple"
        placeholder="Find Auths"
        value={mixMappingAuthSelectedItems}
        onChange={(values) => { updateMixMappingAuthSelectedItems(values) }}
        style={{ width: '30%', margin: '5px' }}
      >
        {authList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        placeholder="Find Group"
        value={mixMappingGroupSelectedItems}
        onChange={(values) => { updateMixMappingGroupSelectedItems(values) }}
        style={{ width: '30%', margin: '5px' }}
      >
        {groupList.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Row>
        <Col span={24}>
          <Card title={"User Mapping Auth"} >
            {
              thisUserMappingAuthList.map(item => <Tag closable={false} style={{ padding: '5px', margin: '5px' }}>{item.user + "-" + item.auth + "-" + item.group}</Tag>)
            }
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title={"User Mapping Group"} >
            {
              userMappingGroupList.map(item => <Tag closable={true} onClose={() => mappingUserD(item.user, item.group)} style={{ padding: '5px', margin: '5px' }}>{item.user + "-" + item.group}</Tag>)
            }
          </Card>
        </Col>
        <Col span={12}>
          <Card title={"Auth Mapping Group"} >
            {
              authMappingGroupList.map(item => <Tag closable={true} onClose={() => mappingAuthD(item.auth, item.group)} style={{ padding: '5px', margin: '5px' }}>{item.auth + "-" + item.group}</Tag>)
            }
          </Card>
        </Col>
      </Row>
    </Card>)
  }
}
export default Mapping