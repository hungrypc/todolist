import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

const { SubMenu } = Menu;

const Nav = (props) => {

    const handleClick = e => {
        console.log('click ', e);
    };

    return (
        <div className="nav">
            <div className="logo nav__user">
                <div className="nav__user-dp">
                    <img src={props.dp} alt="user photo" className="nav__user-dp-img"></img>
                </div>
                <div className="nav__user-name">{props.displayName}</div>
            </div>
            <Menu
                onClick={handleClick}
                className="nav__menu"
                defaultSelectedKeys={['1']}
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
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
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

export default Nav;
