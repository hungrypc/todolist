import React, { useState } from 'react';
import moment from 'moment';

import Calendar from 'antd/lib/calendar';
import Badge from 'antd/lib/badge'

const CalendarView = (props) => {

    const [selectedDate, setSelectedDate] = useState(props.calDate);

    let todoMap = {};

    const orgListByDay = list => {
        for (const todo of list) {
            let date = new Date(todo.date.seconds * 1000)
            if (todoMap[date]) {
                todoMap[date] = [...todoMap[date], todo ];
            } else {
                todoMap[date] = [todo]
            }
        }
    }
    orgListByDay(props.todos)
    console.log(todoMap)
    

    function getListData(value) {
        let listData = [];
        let cellDate = value.format("MM Do YY")
        // console.log(value.format("MM Do YY"))
        for (const day in todoMap) {
            if (cellDate === moment(day).format("MM Do YY")) {
                listData = todoMap[day]
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
        // setSelectedDate(value);
        console.log(moment(props.calDate)._d, moment(selectedDate)._d);
    }

    const onPanelChange = value => {
        props.getDate(value)
        console.log(moment(props.calDate)._d, moment(selectedDate)._d);
    }

    return (
        <Calendar
            value={props.calDate}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
        />
    )
};

export default CalendarView;
