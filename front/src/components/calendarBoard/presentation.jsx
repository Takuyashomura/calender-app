import React, { useEffect } from "react";
import { GridList, Typography } from "@material-ui/core";

import CalendarElement from "../calendarElement";
import * as styles from './style.css';

const days = ["日","月","火","水","木","金","土"]


const CalendarBoard = ({ calendar, month, openAddScheduleDialog, openCurrentScheduleDialog, fetchSchedule }) => {
    useEffect(() => {
        fetchSchedule();
    }, []);
   return(
       <div className={ styles.container }>
        <GridList className={ styles.grid } cols={ 7 } spacing={ 0 } cellHeight="auto" >
            { days.map(day =>(
                <li key={ day }>
                    <Typography
                        className={ styles.days }
                        color="textSecondary"
                        align="center"
                        variant="caption"
                        component="div" >
                        { day }
                    </Typography>
                </li>
            ))};
            {
             calendar.map(({ date, schedules }) => (
                <li key={ date.toISOString() } onClick={ () =>  openAddScheduleDialog(date) }>
                    <CalendarElement day={ date } month={ month } schedules={ schedules } onClickSchedule={ openCurrentScheduleDialog }/>
                </li>
            ))
             }
        </GridList>
       </div>
   )
};

export default CalendarBoard;