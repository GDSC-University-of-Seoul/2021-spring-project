import axios from "axios";

const LOGS_DATA_LOADING = "logs/LOGS_DATA_LOADING";
const LOGS_DATA_FETCH = "logs/LOGS_DATA_FETCH";
const LOGS_DATA_ERROR = "logs/LOGS_DATA_ERROR";

// 백엔드 API 를 통해 anomaly log 데이터 Fetch
export const fetchLogsData = () => async (dispatch) => {
  try {
    dispatch({ type: LOGS_DATA_LOADING });
    const logsData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/anomalies/logs`
    );
    dispatch({ type: LOGS_DATA_FETCH, payload: logsData.data });
  } catch (e) {
    dispatch({ type: LOGS_DATA_ERROR, payload: e });
  }
};

/**
 * befLogsData: 이전에 Fetch한 anomaly log 데이터
 * newLogsData: 새로 Fetch한 anomaly log 데이터
 */
const initialState = {
  loading: false,
  data: {
    newLogsData: [],
    recentLogsData: [],
  },
  error: null,
};

export default function logsReducer(state = initialState, action) {
  switch (action.type) {
    case LOGS_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_DATA_FETCH:
      return {
        ...state,
        loading: false,
        data: {
          newLogsData: action.payload.filter(
            (data) =>
              state.data.recentLogsData.find(
                (fetchData) => fetchData.anomaly_log_id === data.anomaly_log_id
              ) === -1
          ),
          recentLogsData: action.payload,
        },
        error: null,
      };
    case LOGS_DATA_ERROR:
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
}
