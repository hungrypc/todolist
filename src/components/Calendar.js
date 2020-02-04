import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Calendar from 'antd/lib/calendar';
import Badge from 'antd/lib/badge'
import Modal from 'antd/lib/modal';
import Drawer from 'antd/lib/drawer';

import TodoForm from './TodoForm';
import { orgListByDay } from '../actions';

const CalendarView = (props) => {

    // MODAL
    const [modalVisible, setModalVisible] = useState(false);
    const handleCancel = () => {
        setModalVisible(false);
    };

    // DRAWER
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [todoItem, setTodoItem] = useState({});
    const showDrawer = (todo) => {
        setTodoItem(todo);
        setDrawerVisible(true);
    };
    const onClose = () => {
        setDrawerVisible(false);
    };

    const [formDrawerVisible, setFormDrawerVisible] = useState(false);
    const showForm = () => {
        setFormDrawerVisible(true);
    }

    const onFormClose = () => {
        setFormDrawerVisible(false);
    }


    // CALENDAR

    useEffect(() => {
        props.orgListByDay(props.todos)
    }, [props.todos])

    function getListData(value) {
        let listData = [];
        let cellDate = value.format("MM Do YY")
        for (const day in props.org) {
            if (cellDate === moment(day).format("MM Do YY")) {
                listData = props.org[day]
            }
        }
        return listData;
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.title}>
                        <Badge status={item.type} text={item.title} />
                    </li>
                ))}
            </ul>
        );
    }

    function getMonthData(value) {
        // todo: total number of todos on month panel?
        return null
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    const onSelect = value => {
        props.getDate(value);
        setModalVisible(true);
    }

    const onPanelChange = value => {
        props.getDate(value)
    }

    return (
        <div className="todo-calendar">
            <Calendar
                value={props.calDate}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
            />
            <Modal
                visible={modalVisible}
                title={moment(props.calDate).format("dddd MMMM Do")}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <div className="todo-calendar__list-container">
                    <div className="todo-calendar__list-container-todos">
                        {getListData(props.calDate).map((todo) => (
                            <div key={todo.title} className="todo-item" onClick={()=> showDrawer(todo)}>
                                <Badge status={todo.type} text={todo.title} />
                            </div>
                        ))}
                        <div className="todo-item add-item" onClick={showForm}>+</div>
                    </div>
                    <Drawer
                        className="todo-calendar__drawer"
                        title={<Badge status={todoItem.type} text={todoItem.title} />}
                        placement="right"
                        closable
                        onClose={onClose}
                        visible={drawerVisible}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <p>{todoItem.description}</p>
                    </Drawer>
                    <Drawer
                        className="todo-calendar__form"
                        title="Add a todo item"
                        placement="right"
                        closable
                        onClose={onFormClose}
                        visible={formDrawerVisible}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <TodoForm onFormClose={onFormClose} date={props.calDate} monthStart={props.monthStart} monthEnd={props.monthEnd}/>
                    </Drawer>
                </div>
            </Modal>
        </div>

    )
};

const mapStateToProps = state => {
    return {
        org: state.todo.org
    }
}

export default connect(mapStateToProps, {
    orgListByDay
})(CalendarView);
