import { FaBell, FaUser } from "react-icons/fa";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { dateFormat, timeFormat } from "../utils/format";
import { getAllRecentLogs, getRecentLogs } from "../api/recentLogs";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import UpdateLoginForm from "./UpdateLoginForm";
import { loadSettingsState } from "../modules/settings";
import useAsync from "../hooks/useAsync";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * 홈페이지 헤더부 구성
 *
 * @param {Object} props history: 리다이렉션을 위한 history 객체
 * @returns {JSX.Element} 홈페이지 헤더부 컴포넌트
 */

function Header({ history }) {
  const ONE_DAY = 24 * 60 * 60 * 1000;

  // 현재 날짜·시간 정보 저장
  const [currDate, setCurrDate] = useState({
    date: null,
    time: null,
  });

  const initMenuOpen = useMemo(
    () => ({
      alarm: false,
      user: false,
    }),
    []
  );

  const [menuOpen, setMenuOpen] = useState(initMenuOpen); // 헤더 메뉴 열기
  const [isChanged, setIsChanged] = useState(false); // 사용자 정보 변경
  const [isLogOut, setIsLogOut] = useState(false); // 사용자 로그아웃

  const { loginInfo } = useSelector((state) => state.loginReducer);

  // 모든 최신 로그
  const [allRecentLogs] = useAsync(() => getAllRecentLogs(), [], "rows");

  // 읽지 않은 알림 로그
  const [unreadLogs, setunreadLogs] = useState([]);

  // 이미 읽은 신규 알림 로그 ID
  const [readAlarmsId, setReadAlarmsId] = useLocalStorage("readAlarms", []);

  const dispatch = useDispatch();

  useEffect(() => {
    // 읽지 않은 알림 로그 필터링
    setunreadLogs(
      allRecentLogs.filter(
        (data) =>
          !readAlarmsId.find(
            (element) => String(element) === String(data.anomaly_log_id)
          )
      )
    );

    // 신규 로그가 생성되는 하루마다 초기화 (선택 시 시간 연장됨)
    const readLogsIdClear = setTimeout(() => {
      setReadAlarmsId([]);
    }, ONE_DAY);

    return () => clearInterval(readLogsIdClear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecentLogs, readAlarmsId]);

  //  날짜·시간 표기 함수 (1초 마다 비동기 처리)
  useEffect(() => {
    const getTime = setInterval(() => {
      const time = new Date();

      setCurrDate({
        date: dateFormat(time),
        time: timeFormat(time),
      });
    }, 1000);

    return () => clearInterval(getTime);
  });

  // 헤더 메뉴 닫기
  useEffect(() => {
    const menuClick = () => setMenuOpen(initMenuOpen);
    window.addEventListener("click", menuClick);

    return () => window.removeEventListener("click", menuClick);
  }, [initMenuOpen]);

  // 언마운트 시 history 객체 반환
  useEffect(() => {
    return history;
  }, [history]);

  // 알람 로그 클릭 이벤트 (읽음 처리)
  const clickNewLogAlarm = useCallback(
    (e) => {
      let target = e.target.closest("li");

      if (!target.dataset.id) return;
      const readId = target.dataset.id;

      // 이미 존재하는 경우 무시 => 다중 입력 방지
      if (readAlarmsId.find((data) => data === readId)) return;
      setReadAlarmsId([...readAlarmsId, readId]);
    },
    [readAlarmsId, setReadAlarmsId]
  );

  // 알림 메세지, 알림음 설정으로 헤더 메뉴 설정
  const {
    settings: { alarmMsgOn, alarmSoundOn },
  } = useSelector((state) => state.settingsReducer);

  useEffect(() => {
    dispatch(loadSettingsState());
  }, [dispatch]);

  // 신규 로그 발생 시 알람음 재생 (알림음 재생 설정 시에만)
  const audioRef = useRef();
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef]);

  return (
    <>
      <header>
        <div className="logo" />
        <div className="info">
          <div
            className={`newLogs-info${
              unreadLogs.length !== 0 && alarmMsgOn ? " logs-unread" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 알림 설정 */}
            {unreadLogs.length !== 0 && alarmMsgOn && alarmSoundOn && (
              <audio src="src/assets/sound/alarm.mp3" autoPlay ref={audioRef} />
            )}
            <FaBell
              className="header-icon"
              onClick={() =>
                setMenuOpen({ ...initMenuOpen, alarm: !menuOpen.alarm })
              }
            />
            {/* 신규 로그 발생 확인 메뉴 */}
            {menuOpen.alarm && (
              <>
                <div className="arrow-up" />
                <ul
                  className="arrowbox-menu alarm-menu"
                  onClick={clickNewLogAlarm}
                >
                  {unreadLogs.length === 0 || !alarmMsgOn ? (
                    <li>새로운 로그 정보가 없습니다.</li>
                  ) : (
                    unreadLogs.map((data) => (
                      <li
                        data-id={data.anomaly_log_id}
                        key={data.anomaly_log_id}
                      >
                        <span>{data.center_name}</span>에서
                        <br /> <span>{data.anomaly_type}</span>이 발생했습니다.
                      </li>
                    ))
                  )}
                </ul>
              </>
            )}
          </div>
          <div className="user-info" onClick={(e) => e.stopPropagation()}>
            <FaUser
              className="header-icon"
              onClick={() =>
                setMenuOpen({ ...initMenuOpen, user: !menuOpen.user })
              }
            />
            {/* 사용자 헤더 메뉴 */}
            {menuOpen.user && (
              <ul className="arrowbox-menu">
                <li>
                  <Link to="/settings">
                    <span>{loginInfo.userName}</span> 님
                  </Link>
                </li>
                <li onClick={() => setIsChanged(true)}>사용자 정보 변경</li>
                <li onClick={() => setIsLogOut(true)}>로그아웃</li>
              </ul>
            )}
          </div>
          <div className="time-info">
            <div>{currDate.date}</div>
            <div>{currDate.time}</div>
          </div>
        </div>
      </header>
      {/* 사용자 정보 변경 */}
      {isChanged && (
        <UpdateLoginForm
          loginInfo={loginInfo}
          history={history}
          setIsChanged={setIsChanged}
        />
      )}
      {/* 로그아웃 창 */}
      {isLogOut && <LogoutModal history={history} setIsLogOut={setIsLogOut} />}
    </>
  );
}
export default Header;
