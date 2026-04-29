import React, { useEffect, useState } from 'react';
import { useStoreTimer } from '../stores/storeTimer';

interface TimerProps {
}

const Timer: React.FC<TimerProps> = () => {
  const { timer } = useStoreTimer();
  const [delta, setDelta] = useState(0);
  const [timerString, setTimerString] = useState("");

  useEffect(() => {
    const d = timer + 120000 - Date.now();
    setDelta( d < 0 ? 0 : d)
  }, [timer]);

  useEffect(() => {
    const id = setInterval(() => {
      if (delta < 1000) return;
      setDelta(delta - 1000);
    }, 1000);

    let minutes = Math.floor(delta / 60000)
    let seconds = ((delta % 60000) / 1000).toFixed(0)

    if(Number(seconds)===60){
      minutes=minutes+1
      seconds="0"
    }

    const minutesString = minutes < 10 ? "0" + minutes : minutes
    const secondsString = Number(seconds) < 10 ? "0" + seconds : seconds

    setTimerString(minutesString + ":" + secondsString)

    return () => clearInterval(id);
  }, [delta])

  return <>
    <span>{timerString}</span>
  </>
};

export default Timer;