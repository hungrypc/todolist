import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Calendar from 'antd/lib/calendar';
import Badge from 'antd/lib/badge'
import Modal from 'antd/lib/modal';
import Drawer from 'antd/lib/drawer';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Checkbox from 'antd/lib/checkbox';

import TodoForm from './TodoForm';
import { orgListByDay, changeStatus, fetchTodos } from '../actions';

const CalendarView = (props) => {

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
    };

    const onFormClose = () => {
        setFormDrawerVisible(false);
    };

    // MODAL
    const [modalVisible, setModalVisible] = useState(false);
    const handleCancel = () => {
        setFormDrawerVisible(false);
        setDrawerVisible(false);
        setModalVisible(false);
    };

    // CALENDAR

    useEffect(() => {
        props.orgListByDay(props.todos)
    }, [props.todos]);

    function getListData(value) {
        let listData = [];
        let cellDate = value.format("MM Do YY")
        for (const day in props.org) {
            if (cellDate === moment(day).format("MM Do YY")) {
                listData = props.org[day]
            }
        }
        return listData;
    };

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events">
                {// eslint-disable-next-line 
                    listData.map((item) => {
                        if (item.pending) {
                            if (props.tag === "all") {
                                return (
                                    <div className={item.type}>
                                        <li key={item.title}>
                                            <Badge status={item.type} text={item.title}  />
                                        </li>

                                    </div>
                                )
                            } else if (props.tag === item.type) {
                                return (
                                    <li key={item.title}>
                                        <Badge status={item.type} text={item.title} />
                                    </li>
                                )
                            }
                        }

                    })}
            </ul>
        );
    };

    function getMonthData(value) {
        // todo: total number of todos on month panel?
        return null
    };

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const onSelect = value => {
        props.getDate(value);
        setModalVisible(true);
    };

    const onPanelChange = value => {
        props.getDate(value)
    };

    // CHECKBOX

    const onCheckboxChange = (e) => {
        setDrawerVisible(false);
        props.changeStatus(e);
        props.fetchTodos(props.monthStart, props.monthEnd);
    };

    const toggleChecked = (todo) => {
        if (!todo.pending) {
            return true
        } else {
            return false
        }
    };

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
                        {// eslint-disable-next-line 
                            getListData(props.calDate).map((todo) => {
                                if (todo.pending) {
                                    return (
                                        <div key={todo.id} className="todo-item pending" id={todo.type} type="default" onClick={() => showDrawer(todo)}>
                                            <Badge status={todo.type} text={todo.title} />
                                            <Checkbox onChange={() => onCheckboxChange(todo)} className="todo-item-checkbox" />
                                        </div>
                                    )
                                }
                            })}
                        <Button className="todo-item add-item" type="dashed" onClick={showForm}><Icon type="plus" /></Button>
                        <div className="completed-items">
                            {// eslint-disable-next-line 
                                getListData(props.calDate).map((todo) => {
                                    if (!todo.pending) {
                                        return (
                                            <div key={todo.id} className="todo-item completed" onClick={() => showDrawer(todo)}>
                                                <Badge status="default" text={todo.title} className="todo-item--complete" />
                                            </div>
                                        )
                                    }
                                })}
                        </div>
                    </div>
                    <Drawer
                        className="todo-calendar__drawer"
                        title={<Badge status={todoItem.pending ? todoItem.type : 'default'} text={todoItem.title} />}
                        placement="right"
                        closable
                        onClose={onClose}
                        visible={drawerVisible}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                    >
                        <div className="drawer-notes">Notes:</div>
                        <div className="todo-calendar__drawer-description">{todoItem.description}</div>
                        <div className="todo-calendar__drawer-checkbox"><Checkbox onChange={() => onCheckboxChange(todoItem)} checked={toggleChecked(todoItem)} >Completed</Checkbox></div>

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
                        <TodoForm onFormClose={onFormClose} date={props.calDate} monthStart={props.monthStart} monthEnd={props.monthEnd} />
                    </Drawer>
                </div>
            </Modal>
        </div>

    )
};

const mapStateToProps = state => {
    return {
        org: state.todo.org,
        tag: state.tags.selectedTag
    }
}

export default connect(mapStateToProps, {
    orgListByDay,
    changeStatus,
    fetchTodos
})(CalendarView);
