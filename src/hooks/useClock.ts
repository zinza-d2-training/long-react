import { ITime } from 'models';
import { useEffect, useState } from 'react';

const MIN = 0;
const MAX = 59;

export const useClock = (startTime: ITime) => {
  const [time, setTime] = useState<ITime>(startTime);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (time.hours > 0 || time.minutes > 0 || time.seconds > 0) {
        if (time.seconds === MIN) {
          if (time.minutes === MIN) {
            if (time.hours === MIN) {
              setTime({
                hours: 0,
                minutes: 0,
                seconds: 0
              });
            } else {
              setTime({
                hours: time.hours - 1,
                minutes: MAX,
                seconds: MAX
              });
            }
          } else {
            setTime({
              ...time,
              minutes: time.minutes - 1,
              seconds: MAX
            });
          }
        } else {
          setTime({
            ...time,
            seconds: time.seconds - 1
          });
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);
  return {
    time: `${time.hours < 10 ? '0' + time.hours.toString() : time.hours}:${
      time.minutes < 10 ? '0' + time.minutes.toString() : time.minutes
    }:${time.seconds < 10 ? '0' + time.seconds.toString() : time.seconds}`,
    setTime
  };
};
