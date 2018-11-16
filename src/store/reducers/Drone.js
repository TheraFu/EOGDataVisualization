import * as actions from "../actions";

const initialState = {
    loading: false,
    metric: "",
    latitude: null,
    longitude: null,
    timestamp: null,
    data: {}
};

const startLoading = (state, action) => {
    return { ...state, loading: true };
};

const droneDataReceived = (state, action) => {
    const { data } = action;
    if (!data[0]) return state;
    const {metric, latitude, longitude, timestamp} = data[data.length-1];

    return {
        ...state,
        loading: false,
        metric,
        latitude,
        longitude,
        timestamp,
        data: action.data
    };
};

const handlers = {
    [actions.FETCH_DRONE]: startLoading,
    [actions.DRONE_DATA_RECEIVED]: droneDataReceived,
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};
