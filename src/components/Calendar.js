import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Calendar from 'antd/lib/calendar';
import Badge from 'antd/lib/badge'
import Modal from 'antd/lib/modal';

import { orgListByDay } from '../actions';

const CalendarView = (props) => {

    // MODAL

    const [visible, setVisible] = useState(false);
    const handleCancel = () => {
        setVisible(false);
    }


    // CALENDAR

    let todoMap = {};

    // const orgListByDay = list => {
    //     for (const todo of list) {
    //         let date = new Date(todo.date.seconds * 1000)
    //         if (todoMap[date]) {
    //             todoMap[date] = [...todoMap[date], todo];
    //         } else {
    //             todoMap[date] = [todo]
    //         }
    //     }
    // }
    // orgListByDay(props.todos)

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
        setVisible(true);
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
                visible={visible}
                title="Title"
                onCancel={handleCancel}
                footer={null}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
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
