import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Layout from 'antd/lib/layout';

import Nav from './Nav';
import Calendar from './Calendar';

import { selectDate, fetchTodos } from '../actions';


const { Content, Footer, Sider } = Layout;

const Main = (props) => {

    const today = new Date(props.date)
    const monthStart = new Date(today.getFullYear(), today.getMonth(), -11) // -11 b/c calendar can display days from month before
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 11); // 11 b.c calendar can display days from month after

    const getDate = selectedDate => {
        props.selectDate(selectedDate)
    }

    // FIX DATE SELECT VS MONTH SELECT HERE
    useEffect(() => {
        props.fetchTodos(monthStart, monthEnd)
    }, [props.date])

    return (
        <div className="main">
            <Layout>
                <Sider className="main__sider" theme="light">
                    <Nav displayName={props.user.displayName} dp={props.user.photoURL} signOut={props.signOut} />
                </Sider>
                <Layout className="main__layout">
                    <Content className="main__content">
                        <div className="main__content-container">
                            <Calendar calDate={moment(props.date)} getDate={getDate} todos={props.todo} monthStart={monthStart} monthEnd={monthEnd}/>
                        </div>
                    </Content>
                    <Footer className="main__footer">Made by: Phil Chan</Footer>
                </Layout>
            </Layout>
        </div>
    )
};

const mapStateToProps = (state) => {
    return { 
        date: state.todo.date,
        todo: state.todo.list 
    }
}

export default connect(mapStateToProps, {
    selectDate,
    fetchTodos
})(Main);