import { schedulesFetchItem,
         schedulesSetLoading,
         schedulesAddItem,
         schedulesDeleteItem,
         schedulesAsyncFalur
        } from "./actions";

import { get, post, deleteRequest  } from "../../services/api";
import { formatSchedule } from "../../services/schedule";

export const asyncScheduleFetchItem = ({ month, year }) => async dispatch => {
    dispatch(schedulesSetLoading());

    try{

    const result = await get(`schedules?month=${month}&year=${year}`);
    const formatedSchedule = result.map(r => formatSchedule( r ));
    dispatch(schedulesFetchItem(formatedSchedule));

    } catch (err){
        dispatch(schedulesAsyncFalur( err.message ));
    };
};

export const asyncSchedulesAddItem = schedule => async dispatch => {

    //loadingをtrueに
    dispatch( schedulesSetLoading() );

    //非同期処理でエラーを捕捉できるようにする
    try{

    const body = { ...schedule, date: schedule.date.toISOString() };
    const result = await post("schedules", body );

    const newSchedule = formatSchedule( result );
    dispatch(schedulesAddItem( newSchedule ));

    } catch (err) {
        //文字列としてエラー内容を取得
        dispatch(schedulesAsyncFalur( err.message ));
    };
};

export const asyncScheduleDeleteItem = id => async ( dispatch, getState ) => {
    dispatch( schedulesSetLoading() );
    const currentSchedules = getState().schedules.items;

    try{

    await deleteRequest(`schedules/${id}`);

    //ローカルのstateを削除
    const newSchedules = currentSchedules.filter(s => s.id !== id);
    dispatch(schedulesDeleteItem( newSchedules ));

    } catch (err) {
        dispatch(schedulesAsyncFalur( err.message ));
    };
};
