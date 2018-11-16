import {
    takeLatest,
    call,
    put,
    cancel
} from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchDrone(action) {
    const { error, data } = yield call(API.getDrone);
    if (error) {
        yield put({ type: actions.API_ERROR, code: error.code });
        yield cancel();
        return;
    }
    const latest = data[0] ? data[0] : false;
    if (!latest) {
        yield put({ type: actions.API_ERROR });
        yield cancel();
        return;
    }
    console.log(latest);
    const { latitude, longitude } = latest;
    yield put({ type: actions.FETCH_WEATHER, latitude, longitude});
    yield put({ type: actions.DRONE_DATA_RECEIVED, data });
}

function* watchDrone() {
    yield takeLatest(actions.FETCH_DRONE, watchFetchDrone)
}

export default [watchDrone];
