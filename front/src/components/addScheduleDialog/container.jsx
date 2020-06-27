import AddScheduleDialog from "./presentation";
import { connect } from "react-redux";
import { addScheduleCloseDialog, addScheduleSetValue, addScheduleStartEdit } from "../../redux/addSchedule/actions";
import { asyncSchedulesAddItem } from "../../redux/schedules/effects";
import { isCloseDialog } from "../../services/schedule";

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

const mergeProps = ( stateProps , disptchProps ) => {
    const { schedule: { form: schedule } } = stateProps; 
    const { saveSchedule, closeDialog } = disptchProps;

    return{

        ...stateProps,
        ...disptchProps,
        saveSchedule: () => {
            const { schedule: { form: schedule } } = stateProps;
            disptchProps.saveSchedule(schedule);
        },

        closeDialog: () => {
            if (isCloseDialog(schedule)){
                closeDialog();
            }
        }
    }
}


export default connect(mapStateToProps, mapDisptchToProps, mergeProps)(AddScheduleDialog);