import React, { useState } from 'react';
import { connect } from 'react-redux';
import Layout from 'antd/lib/layout';

import Nav from './Nav';


const { Content, Footer, Sider } = Layout;

const Main = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = col => {
        console.log(collapsed);
        setCollapsed(col);
    };

    return (
        <div className="main">
            <Layout>
                <Sider className="main__sider" theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <Nav displayName={props.user.displayName} dp={props.user.photoURL} signOut={props.signOut} />
                </Sider>
                <Layout className="main__layout">
                    <Content className="main__content">
                        <div className="main__content-container">
                            main
                        </div>
                    </Content>
                    <Footer className="main__footer">made by: Phil Chan</Footer>
                </Layout>
            </Layout>
        </div>
    )
};

const mapStateToProps = (state) => {
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(Main);