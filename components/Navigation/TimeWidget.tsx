import React from "react";

function TimeWidget() {
  const [time, setTime] = React.useState({
    day: new Date().getDay(),
    minutes: new Date().getMinutes(),
    hours: new Date().getHours() === 0 ? 12 : new Date().getHours(),
    seconds: new Date().getSeconds(),
    period: new Date().getHours() >= 12 ? " PM" : " AM",
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        day: date.getDay(),
        minutes: date.getMinutes(),
        hours: date.getHours() === 0 ? 12 : date.getHours(),
        seconds: date.getSeconds(),
        period: date.getHours() >= 12 ? " PM" : " AM",
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToTwoDigit = (number: number) => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  };

  const convertTo12HourPeriod = (number: number) => {
    if (number > 12) {
      return number - 12;
    }
    return number;
  };

  return (
    <li className="flex flex-row items-center flex-wrap justify-between float-right my-0 mx-3 hover:text-black bg-transparent px-1.5 py-0.5">
      <span className="mr-2">{daysOfWeek?.[time?.day ?? 0]?.slice(0, 3)}</span>
      <span>{convertTo12HourPeriod(time.hours)}</span>
      <span className="mr-2">
        <span className="text-blinker">:</span>
        {convertToTwoDigit(time.minutes)}
      </span>
      <span>{time.hours >= 12 ? "PM" : "AM"}</span>
    </li>
  );
}

export default TimeWidget;
