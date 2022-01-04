import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {TaskDetailsModal} from "./TaskDetailsModal";


export function ViewCalendarScreen() {
    const events = [
        {
            title: 'Wyrzucanie smieci',
            _id: "wyrzID",
            _assignee: "Maciek",
            _deadline: new Date(2022, 0, 13),
            start: new Date(2022, 0, 11),
            end: new Date(2022, 0, 11)
        },
        {
            title: 'Wyrzucanie smieci',
            _id: "wyrzID",
            _assignee: "Wladek",
            _deadline: new Date(2022, 0, 13 + 7),
            start: new Date(2022, 0, 11 + 7),
            end: new Date(2022, 0, 11 + 7)
        },
        {
            title: 'Wyrzucanie smieci',
            _id: "wyrzID",
            _assignee: "Adrian",
            _deadline: new Date(2022, 0, 13 + 14),
            start: new Date(2022, 0, 11 + 14),
            end: new Date(2022, 0, 11 + 14)
        },
        {
            title: 'Jedzenie Grzybow',
            _id: "jedzID",
            _assignee: "Bocian",
            _deadline: new Date(2022, 0, 13),
            start: new Date(2022, 0, 11),
            end: new Date(2022, 0, 11)
        },
        {
            title: 'Jedzenie Grzybow',
            _id: "jedzID",
            _assignee: "Kuba",
            _deadline: new Date(2022, 0, 13+4),
            start: new Date(2022, 0, 11 + 4),
            end: new Date(2022, 0, 11 + 4)
        },
        {
            title: 'Jedzenie Grzybow',
            _id: "jedzID",
            _assignee: "Bocian",
            _deadline: new Date(2022, 0, 13+8),
            start: new Date(2022, 0, 11 + 8),
            end: new Date(2022, 0, 11 + 8)
        },
        {
            title: 'Jedzenie Grzybow',
            _id: "jedzID",
            _assignee: "Kuba",
            _deadline: new Date(2022, 0, 13+12),
            start: new Date(2022, 0, 11 + 12),
            end: new Date(2022, 0, 11 + 12)
        },
    ]

    function eventClicked(event) {
        setTaskState(event)
        setShowTaskDetailsModal(true)
    }

    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [taskState, setTaskState] = useState({});

    return (
        <View style={{
            overflow: "scroll",
            height: "calc(100vh - 75px)",
        }}>
            <Calendar
                events={events}
                height={510}
                mode={'month'}
                showTime={true}
                swipeEnabled={true}
                showAllDayEventCell={false}
                onPressEvent={
                    event => eventClicked(event)
                }
            />
            <TaskDetailsModal
                show={showTaskDetailsModal}
                setShow={setShowTaskDetailsModal}
                taskData={taskState}
            />
        </View>
    );
}