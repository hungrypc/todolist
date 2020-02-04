import React from 'react';
import { connect } from 'react-redux';

import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Badge from 'antd/lib/badge'

import { selectTag } from '../actions';

const { SubMenu } = Menu;

const Nav = (props) => {

    const handleClick = e => {
        console.log('click ', e);
        props.selectTag(e.key);
    };

    return (
        <div className="nav">
            <div className="logo nav__user">
                <div className="nav__user-dp">
                    <img src={props.dp} alt="user" className="nav__user-dp-img"></img>
                </div>
                <div className="nav__user-name">{props.displayName}</div>
            </div>
            <Menu
                onClick={handleClick}
                className="nav__menu"
                defaultSelectedKeys={['all']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >

                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="tag" />
                            <span>Tags</span>
                        </span>
                    }
                >
                    <Menu.Item key="all">
                        <Badge status="default" text="All" />
                    </Menu.Item>
                    <Menu.Item key="success">
                        <Badge status="success" text="Tag 1" />
                    </Menu.Item>
                    <Menu.Item key="warning">
                        <Badge status="warning" text="Tag 2" />
                    </Menu.Item>
                    <Menu.Item key="error">
                        <Badge status="error" text="Tag 3" />
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="setting" />
                            <span>Settings</span>
                        </span>
                    }
                >
                    <Menu.Item key="5" onClick={() => props.signOut()}>
                        <Icon type="logout" />
                        Sign Out
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default connect(null, {
    selectTag
})(Nav);
