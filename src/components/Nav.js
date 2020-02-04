import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Badge from 'antd/lib/badge';
import Popover from 'antd/lib/popover';

import TagForm from './TagForm';

import { selectTag, fetchTags, setTag, handlePopover } from '../actions';

const { SubMenu } = Menu;

const Nav = (props) => {

    const handleClick = e => {
        console.log('click ', e);
        props.selectTag(e.key);
    };

    useEffect(() => {
        props.fetchTags()
    }, [])

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
                        <Badge status="success" text={props.tags.success} />
                        <Popover placement="right" content={<TagForm />} trigger="click" visible={props.popover.success} onVisibleChange={() => props.handlePopover('success', props.popover.success)}>
                            <Icon type="edit" className="tag-edit" />
                        </Popover>
                    </Menu.Item>
                    <Menu.Item key="warning">
                        <Badge status="warning" text={props.tags.warning} />
                        <Popover placement="right" content={<TagForm />}  trigger="click" visible={props.popover.warning} onVisibleChange={() => props.handlePopover('warning', props.popover.warning)}>
                            <Icon type="edit" className="tag-edit" />
                        </Popover>
                    </Menu.Item>
                    <Menu.Item key="error">
                        <Badge status="error" text={props.tags.error} />
                        <Popover placement="right" content={<TagForm />}  trigger="click" visible={props.popover.error} onVisibleChange={() => props.handlePopover('error', props.popover.error)}>
                            <Icon type="edit" className="tag-edit" />
                        </Popover>
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

const mapStateToProps = state => {
    return {
        selectedTag: state.tags.selectTag,
        tags: state.tags.tags,
        popover: state.tags.popover
    }
}

export default connect(mapStateToProps, {
    selectTag,
    fetchTags,
    setTag,
    handlePopover
})(Nav);
