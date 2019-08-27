import React from "react";
import { render } from "react-dom";
import { Row, Col, message } from "antd";
import "antd/dist/antd.css";
import PropertyName from "./property/PropertyName";
import PropertyNameGroup from "./property/PropertyNameGroup";
import PropertyNameGroupMapping from "./property/PropertyNameGroupMapping";
import AuthMappingGroup from "./property/AuthMappingGroup";
import Mapping from "./property/Mapping";

class AuthManager extends React.Component {
  state = {

    studentList: [{ Age: 18, Name: "xiaoming", Sex: "Male" }, { Age: 21, Name: "lily", Sex: "Female" }, { Age: 17, Name: "xixi", Sex: "Male" }],
    teacherList: [{ Age: 18, Name: "xiaoming", Sex: "Male" }, { Age: 21, Name: "lily", Sex: "Female" }, { Age: 17, Name: "xixi", Sex: "Male" }],
    entityType: ["student", "teacher"],

    propertyNameList: [{ name: "country", regex: ".{1,100}" }, { name: "province", regex: ".{1,100}" }, { name: "city", regex: ".{1,100}" }],
    propertyNameGroupList: ['Address'],
    propertyNameGroupMappingList: [{ propertyName: "country", propertyGroupName: "Address" }, { propertyName: "province", propertyGroupName: "Address" }, { propertyName: "city", propertyGroupName: "Address" }],

    authMappingGroupList: [],
    userMappingGroupList: [],

    authMappingAuthSelectedItems: [],
    authMappingGroupSelectedItems: [],

    userMappingUserSelectedItems: [],
    userMappingGroupSelectedItems: [],

    mixMappingUserSelectedItems: [],
    mixMappingAuthSelectedItems: [],
    mixMappingGroupSelectedItems: [],
  }

  propertyNameAdd = (name, regex) => {
    let thisPros = this.state.propertyNameList.filter(x => x.name == name && x.regex == regex)
    if (thisPros.length == 0) {
      this.state.propertyNameList.push({ name: name, regex: regex })
      this.setState({})
    }
  }
  propertyNameDel = (name, regex) => {
    let thisPros = this.state.propertyNameList.filter(x => x.name == name && x.regex == regex)
    if (thisPros.length > 0) {
      this.state.propertyNameList.splice(this.state.propertyNameList.indexOf(thisPros[0]), 1)
    }
    this.setState({})
  }

  propertyNameGroupAdd = (name) => {
    let indexOf = this.state.propertyNameGroupList.indexOf(name)
    if (indexOf == -1) {
      this.state.propertyNameGroupList.push(name)
      this.setState({})
    }
  }
  propertyNameGroupDel = (name) => {
    let indexOf = this.state.propertyNameGroupList.indexOf(name)
    if (indexOf > -1) {
      this.state.propertyNameGroupList.splice(indexOf, 1)
    }
    this.setState({})
  }

  mappingPropertyName = (name, group) => {
    let existInfos = this.state.propertyNameGroupMappingList.filter(x => x.propertyName == name && x.propertyGroupName == group)
    if (existInfos.length == 0) {
      this.state.propertyNameGroupMappingList.push({ propertyName: name, propertyGroupName: group })
      this.setState()
    }
  }

  groupAdd = (name) => {
    let indexOf = this.state.groupList.indexOf(name)
    if (indexOf == -1) {
      this.state.groupList.push(name)
      this.setState({})
    }
  }
  groupDel = (name) => {
    let indexOf = this.state.groupList.indexOf(name)
    console.log(this.state.groupList)
    if (indexOf > -1) {
      this.state.groupList.splice(indexOf, 1)
    }
    console.log(this.state.groupList)
    var exsitInfos = [];
    exsitInfos = this.state.authMappingGroupSelectedItems.filter(x => x == name)
    if (exsitInfos.length > 0) {
      this.state.authMappingGroupSelectedItems.splice(this.state.authMappingGroupSelectedItems.indexOf(exsitInfos[0]), 1)
    }
    exsitInfos = this.state.userMappingGroupSelectedItems.filter(x => x == name)
    if (exsitInfos.length > 0) {
      this.state.userMappingGroupSelectedItems.splice(this.state.userMappingGroupSelectedItems.indexOf(exsitInfos[0]), 1)
    }
    exsitInfos = this.state.mixMappingGroupSelectedItems.filter(x => x == name)
    if (exsitInfos.length > 0) {
      this.state.mixMappingGroupSelectedItems.splice(this.state.mixMappingGroupSelectedItems.indexOf(exsitInfos[0]), 1)
    }
    this.setState({})
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
  mappingAuth = () => {
    if (!this.state.authMappingAuthSelectedItems.length > 0) {
      message.error("关联权限为空"); return
    }
    if (!this.state.authMappingGroupSelectedItems.length > 0) {
      message.error("关联组为空"); return
    }
    let count = 0
    for (let i = 0; i < this.state.authMappingAuthSelectedItems.length; i++) {
      for (let j = 0; j < this.state.authMappingGroupSelectedItems.length; j++) {
        var existInfos = this.state.authMappingGroupList.filter(x => x.auth == this.state.authMappingAuthSelectedItems[i] && x.group == this.state.authMappingGroupSelectedItems[j])
        if (existInfos.length < 1) {
          count++
          this.state.authMappingGroupList.push({ auth: this.state.authMappingAuthSelectedItems[i], group: this.state.authMappingGroupSelectedItems[j] })
        }
      }
    }
    console.log(this.state.authMappingGroupList)
    message.success("成功关联" + count + "条数据")
    this.updateAuthMappingAuthSelectedItems([])
    this.updateAuthMappingGroupSelectedItems([])
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
                propertyNameGroupDel={this.propertyNameGroupDel}
                propertyNameGroupList={this.state.propertyNameGroupList}
              ></PropertyNameGroup>
            </Col>
            <Col span={8}>
              <PropertyNameGroupMapping
                propertyNameList={this.state.propertyNameList}
                propertyNameGroupList={this.state.propertyNameGroupList}
                propertyNameMapping={this.propertyNameMapping}
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
              {/* <Mapping
                authList={this.state.authList}
                userList={this.state.userList}
                groupList={this.state.groupList}

                userMappingGroupList={this.state.userMappingGroupList}
                authMappingGroupList={this.state.authMappingGroupList}

                mixMappingUserSelectedItems={this.state.mixMappingUserSelectedItems}
                updateMixMappingUserSelectedItems={this.updateMixMappingUserSelectedItems}
                mixMappingAuthSelectedItems={this.state.mixMappingAuthSelectedItems}
                updateMixMappingAuthSelectedItems={this.updateMixMappingAuthSelectedItems}
                mixMappingGroupSelectedItems={this.state.mixMappingGroupSelectedItems}
                updateMixMappingGroupSelectedItems={this.updateMixMappingGroupSelectedItems}

                mappingAuthD={this.mappingAuthD}
                mappingUserD={this.mappingUserD}
              /> */}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

render(<AuthManager />, document.getElementById("root"));