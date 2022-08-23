import type { NextPage } from "next";
import { useTimer } from "react-timer-hook";
import styles from "../styles/components/Timer.module.scss";

type TimerProps = {
  time: Date;
};

const Timer: NextPage<TimerProps> = ({ time }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => window.location.reload(),
  });

  return (
    <div className={styles.container}>
      <p className="animate__animated animate__pulse">
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default Timer;
