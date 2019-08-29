import React from "react";
import { render } from "react-dom";
import { Row, Col, message, Table } from "antd";
import "antd/dist/antd.css";
import PropertyName from "./property/PropertyName";
import PropertyNameGroup from "./property/PropertyNameGroup";
import PropertyNameGroupMapping from "./property/PropertyNameGroupMapping";
import EntityTypeMapping from "./property/EntityTypeMapping";
import Mapping from "./property/Mapping";

class AuthManager extends React.Component {
  state = {

    studentList: [{ ID: '1', Age: 18, Name: "xiaoming", Sex: "Male" }, { ID: '2', Age: 21, Name: "lily", Sex: "Female" }, { ID: '3', Age: 17, Name: "xixi", Sex: "Male" }],
    teacherList: [{ ID: '1', Age: 18, Name: "xiaoming", Sex: "Male" }, { ID: '2', Age: 21, Name: "lily", Sex: "Female" }, { ID: '3', Age: 17, Name: "xixi", Sex: "Male" }],
    entityTypeList: ["student", "teacher"],

    propertyNameList: [{ name: "country", regex: ".{1,100}" }, { name: "province", regex: ".{1,100}" }, { name: "city", regex: ".{1,100}" }],
    propertyNameGroupList: ['BusiAddress'],
    propertyNameGroupMappingList: [
      { propertyName: "country", propertyGroupName: "BusiAddress" }, { propertyName: "province", propertyGroupName: "BusiAddress" }, { propertyName: "city", propertyGroupName: "BusiAddress" },
    ],

    entityTypeMappingList: [{ propertyGroupName: "BusiAddress", entityType: "student" }],

    propertyValueList: [
      { objectID: '1', entityType: 'student', propertyGroupName: "BusiAddress", propertyName: "country", value: '中国' },
      { objectID: '1', entityType: 'student', propertyGroupName: "BusiAddress", propertyName: "province", value: '广东' },
      { objectID: '1', entityType: 'student', propertyGroupName: "BusiAddress", propertyName: "city", value: '南山' }
    ],

    authMappingGroupList: [],
    userMappingGroupList: [],
  }

  getUid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  studentSourceBuild() {
    if (this.state.studentList.length > 0) {
      this.state.studentList.forEach((student, studentIndex) => {
        let thisPropertyValueList = this.state.propertyValueList.filter(x => x.entityType == 'student' && x.objectID == student.ID)
        thisPropertyValueList.forEach((propertyValue) => {
          this.state.studentList[studentIndex][propertyValue.propertyGroupName + '-' + propertyValue.propertyName] = propertyValue.value
        })
      })
    }
    return this.state.studentList;
  }
  studentColumnsBuild() {
    var baseColumns = [{
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    }, {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
    }, {
      title: 'Sex',
      dataIndex: 'Sex',
      key: 'Sex',
    }];
    let groupMappingList = this.state.entityTypeMappingList.filter(x => x.entityType == "student")
    if (groupMappingList.length > 0) {
      for (let i = 0; i < groupMappingList.length; i++) {
        let propertyNameList = this.state.propertyNameGroupMappingList.filter(x => x.propertyGroupName == groupMappingList[i].propertyGroupName)
        propertyNameList.forEach(item => {
          baseColumns.push({
            title: item.propertyGroupName + '-' + item.propertyName,
            dataIndex: item.propertyGroupName + '-' + item.propertyName,
            key: item.propertyGroupName + '-' + item.propertyName,
          })
        })
      }
    }
    return baseColumns
  }

  propertyNameAdd = (name, regex) => {
    let thisPros = this.state.propertyNameList.filter(x => x.name == name && x.regex == regex)
    if (thisPros.length == 0) {
      this.state.propertyNameList.push({ name: name, regex: regex })
      this.setState({})
    }
  }
  mappingPropertyName = (nameList, groupList) => {
    nameList.forEach(name => {
      groupList.forEach(group => {
        let existInfos = this.state.propertyNameGroupMappingList.filter(x => x.propertyName == name && x.propertyGroupName == group)
        if (existInfos.length == 0) {
          this.state.propertyNameGroupMappingList.push({ propertyName: name, propertyGroupName: group })
        }
      })
    })
    this.studentSourceBuild()
    this.setState({})
  }
  propertyNameGroupAdd = (name) => {
    let indexOf = this.state.propertyNameGroupList.indexOf(name)
    if (indexOf == -1) {
      this.state.propertyNameGroupList.push(name)
      this.setState({})
    }
  }
  mappingEntityType = (entityTypeList, propertyGroupNameList) => {
    entityTypeList.forEach(entityType => {
      propertyGroupNameList.forEach(propertyGroupName => {
        let thisList = this.state.entityTypeMappingList.filter(x => x.propertyGroupName == propertyGroupName && x.entityType == entityType)
        if (thisList.length == 0) {
          this.state.entityTypeMappingList.push({ propertyGroupName: propertyGroupName, entityType: entityType })
        }
      })
    })
    this.setState({})
  }
  entityTypeAdd = (entityTypeName) => {
    let thisPros = this.state.entityTypeList.filter(x => x == entityTypeName)
    if (thisPros.length == 0) {
      this.state.entityTypeList.push(entityTypeName)
      this.setState({})
    }
  }
  mappingValue = (objectID, entityType, propertyGroupName, propertyName, value) => {
    this.state.propertyValueList.push({
      objectID,
      entityType,
      propertyGroupName,
      propertyName,
      value
    })
  }

  mappingUser = () => {
    if (!this.state.userMappingUserSelectedItems.length > 0) {
      message.error("关联用户为空"); return
    }
    if (!this.state.userMappingGroupSelectedItems.length > 0) {
      message.error("关联组为空"); return
    }
    let count = 0
    for (let i = 0; i < this.state.userMappingUserSelectedItems.length; i++) {
      for (let j = 0; j < this.state.userMappingGroupSelectedItems.length; j++) {
        var existInfos = this.state.userMappingGroupList.filter(x => x.user == this.state.userMappingUserSelectedItems[i] && x.group == this.state.userMappingGroupSelectedItems[j])
        if (existInfos.length < 1) {
          count++
          this.state.userMappingGroupList.push({ user: this.state.userMappingUserSelectedItems[i], group: this.state.userMappingGroupSelectedItems[j] })
        }
      }
    }
    console.log(this.state.userMappingGroupList)
    message.success("成功关联" + count + "条数据")
    this.updateUserMappingUserSelectedItems([])
    this.updateUserMappingGroupSelectedItems([])
    this.setState({})
  }

  updateUserMappingUserSelectedItems = (items) => {
    this.setState({ userMappingUserSelectedItems: items })
  }
  updateUserMappingGroupSelectedItems = (items) => {
    this.setState({ userMappingGroupSelectedItems: items })
  }

  updateAuthMappingAuthSelectedItems = (items) => {
    this.setState({ authMappingAuthSelectedItems: items })
  }
  updateAuthMappingGroupSelectedItems = (items) => {
    this.setState({ authMappingGroupSelectedItems: items })
  }


  updateMixMappingUserSelectedItems = (items) => {
    this.setState({ mixMappingUserSelectedItems: items })
  }
  updateMixMappingAuthSelectedItems = (items) => {
    this.setState({ mixMappingAuthSelectedItems: items })
  }
  updateMixMappingGroupSelectedItems = (items) => {
    this.setState({ mixMappingGroupSelectedItems: items })
  }


  render() {
    return (
      <div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <PropertyNameGroup
                propertyNameGroupAdd={this.propertyNameGroupAdd}
                propertyNameGroupList={this.state.propertyNameGroupList}
              ></PropertyNameGroup>
            </Col>
            <Col span={8}>
              <PropertyNameGroupMapping
                propertyNameList={this.state.propertyNameList}
                propertyNameGroupList={this.state.propertyNameGroupList}
                propertyNameGroupMappingList={this.state.propertyNameGroupMappingList}
                propertyNameMapping={this.mappingPropertyName}
              />
            </Col>
            <Col span={8}>
              <PropertyName
                propertyNameAdd={this.propertyNameAdd}
                propertyNameDel={this.propertyNameDel}
                propertyNameList={this.state.propertyNameList}
              ></PropertyName>
            </Col>
          </Row>
            <Row>
              <Col>
                <EntityTypeMapping
                  entityTypeList={this.state.entityTypeList}
                  propertyNameGroupList={this.state.propertyNameGroupList}
                  propertyNameGroupMappingList={this.state.propertyNameGroupMappingList}
                  mappingEntityType={this.mappingEntityType}
                />
              </Col>
            </Row>
        </div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={12}>
              {/* <AuthMappingGroup
                authList={this.state.authList}
                groupList={this.state.groupList}

                authMappingGroupList={this.state.authMappingGroupList}

                authMappingAuthSelectedItems={this.state.authMappingAuthSelectedItems}
                updateAuthMappingAuthSelectedItems={this.updateAuthMappingAuthSelectedItems}
                authMappingGroupSelectedItems={this.state.authMappingGroupSelectedItems}
                updateAuthMappingGroupSelectedItems={this.updateAuthMappingGroupSelectedItems}

                mappingAuth={this.mappingAuth}
              /> */}
            </Col>
          </Row>
        </div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={24}>
              <Table dataSource={this.studentSourceBuild()} columns={this.studentColumnsBuild()} style={{ background: 'white' }}></Table>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

render(<AuthManager />, document.getElementById("root"));