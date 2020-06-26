import Navigation from "./presentation";
import { connect }from "react-redux";
import { getNextMonth,
         getPreviousMonth,
         getMonth,
         formatMonth } from "../../services/calendar";
import { calendarSetMonth } from "../../redux/calendar/actions";
import { asyncScheduleFetchItem } from "../../redux/schedules/effects";

const mapStateToProps = state => ({ calendar: state.calendar });

const mapDispatchToProps = dispatch => ({
    setMonth: month => {
        dispatch(calendarSetMonth( month ))
    },

    fetchMonth: month => {
        dispatch(asyncScheduleFetchItem( month ));
    }
});

const mergeProps = ( stateProps, dispatchProps ) => ({
    month: getMonth( stateProps.calendar ),

    setNextMonth: () => {
        const nextMonth = getNextMonth( stateProps.calendar );
        dispatchProps.setMonth( nextMonth );
        dispatchProps.fetchMonth( nextMonth );
    },
    setPreviousMonth: () => {
        const previousMonth = getPreviousMonth( stateProps.calendar );
        dispatchProps.setMonth( previousMonth );
        dispatchProps.fetchMonth( previousMonth );
    },
    setMonth: dayObj => {
        const month = formatMonth( dayObj );
        dispatchProps.setMonth( month );
        dispatchProps.fetchMonth( month );
    }
});



export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Navigation);