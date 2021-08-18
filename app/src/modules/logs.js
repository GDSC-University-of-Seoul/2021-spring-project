import { dateUTCFormat, timeUTCFormat } from "../utils/format";

import axios from "axios";

const LOGS_DATA_LOADING = "logs/LOGS_DATA_LOADING";
const LOGS_DATA_FETCH = "logs/LOGS_DATA_FETCH";
const LOGS_DATA_ERROR = "logs/LOGS_DATA_ERROR";

const ONE_HOUR = 3600000;

// 백엔드 API 를 통해 anomaly log 데이터 Fetch
export const fetchLogsData = () => async (dispatch) => {
  try {
    dispatch({ type: LOGS_DATA_LOADING });

    const logsData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/anomalies/logs`
    );

    // 날짜 형식 변경
    const formatLogsData = logsData.data.map((logData) => {
      const recordDate = new Date(logData.record_date);

      return {
        ...logData,
        record_date: `${dateUTCFormat(recordDate)} ${timeUTCFormat(
          recordDate
        )}`,
      };
    });

    dispatch({ type: LOGS_DATA_FETCH, payload: formatLogsData });
  } catch (e) {
    dispatch({ type: LOGS_DATA_ERROR, payload: e });
  }
};

/**
 * newLogsData: 일정시간 내에 발생한 anomaly log 데이터 (현재 1시간 기준)
 * recentLogsData: 전체 anomaly log 데이터
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
        error: null,
      };
    case LOGS_DATA_FETCH:
      return {
        ...state,
        loading: false,
        data: {
          newLogsData: action.payload.filter(
            (data) =>
              new Date().getTime() - new Date(data.record_date).getTime() <=
              ONE_HOUR
          ),
          recentLogsData: action.payload,
        },
        error: null,
      };
    case LOGS_DATA_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
