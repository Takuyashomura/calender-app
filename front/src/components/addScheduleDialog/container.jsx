import AddScheduleDialog from "./presentation";
import { connect } from "react-redux";
import { addScheduleCloseDialog, addScheduleSetValue, addScheduleStartEdit } from "../../redux/addSchedule/actions";
import { asyncSchedulesAddItem } from "../../redux/schedules/effects";

const mapStateToProps = state => ({ schedule: state.addSchedule });

const mapDisptchToProps = dispatch => ({
    closeDialog: () => {
        dispatch( addScheduleCloseDialog() )
    },

    setSchedule: value => {
        dispatch( addScheduleSetValue( value ) );
    },

    saveSchedule: schedule => {
        dispatch( asyncSchedulesAddItem( schedule ) );
        dispatch( addScheduleCloseDialog() );
    },

    setEditStart: () => {
        dispatch( addScheduleStartEdit() );
    }
});

const mergeProps = ( stateProps , disptchProps ) => ({
    ...stateProps,
    ...disptchProps,
    saveSchedule: () => {
        const { schedule: { form: schedule } } = stateProps;
        disptchProps.saveSchedule(schedule);
    }
});


export default connect(mapStateToProps, mapDisptchToProps, mergeProps)(AddScheduleDialog);