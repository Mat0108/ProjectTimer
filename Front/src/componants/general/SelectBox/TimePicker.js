import React from "react";
import Image from "next/future/image";

const TimePicker = ({
  selectedValue,
  setSelectedValue,
  className,
  title,
  titleStyle,
  hours,
  minutes,
  hoursRef,
  minutesRef,
  optional,
  optionalStyle,
  onHoursChange,
  onMinutesChange,
  onFocus
}) => {
  //   const hours = [...Array(24).keys()].map((el) =>
  //     el < 10 ? `0${el}` : `${el}`
  //   );
  //   const minutes = [...Array(60).keys()].map((el) =>
  //     el < 10 ? `0${el}` : `${el}`
  //   );
  if (className == null) {
    className =
      "min-h-[45px] p-1 px-4 border-solid  rounded-xl dark:bg-charleston-green focus-visible:outline-0  appearance-none";
    // className="`w-2/3 p-1 px-4 border-solid border-green dark:bg-charleston-green focus-visible:outline-0 border-2 rounded-xl appearance-none`"
  }

  const onHoursChangeCheck = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "")
    console.log(e.target.value)
    e.target.value = parseInt(e.target.value)
    if( isNaN(e.target.value)){
        e.target.value = "00"
        onHoursChange(e)
    }else if( e.target.value > 10){
        e.target.value = e.target.value > 23 ? 23 : e.target.value;
        onHoursChange(e)
        minutesRef.current.focus()
    }else{
        e.target.value = `0${e.target.value}`
        onHoursChange(e)
    }
  };

  const onMinutesChangeCheck = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "")
    console.log(e.target.value)
    e.target.value = parseInt(e.target.value)
    if( isNaN(e.target.value)){
        e.target.value = "00"
        onMinutesChange(e)
    }else if( e.target.value > 10){
        e.target.value = e.target.value > 59 ? 59 : e.target.value;
        onMinutesChange(e)
        minutesRef.current.blur()
    }else{
        e.target.value = `0${e.target.value}`
        onMinutesChange(e)
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <div className="w-96 relative inline" onFocus={onFocus}>
      {title && (
        <div className="py-1 flex flex-row">
          <label
            className={titleStyle || "title label-input"}
            htmlFor="username"
          >
            {title}
          </label>
          {optional && (
            <label
              className={optionalStyle || "title label-input text-gray-silver"}
              htmlFor="username"
            >
              {optional}
            </label>
          )}
        </div>
      )}
      <div className={"border-green border-[1px] rounded-xl"}>
        <div className={className}>
          <div className="flex py-2">
            <input
              ref={hoursRef}
              className={`bg-white2 w-6 dark:bg-charcoal leading-tight focus:outline-none text-input`}
              type="text"
              value={hours}
              onFocus={handleFocus}
              onChange={onHoursChangeCheck}
            />
            <p>:</p>
            <input
              ref={minutesRef}
              className={`bg-white2 w-6 dark:bg-charcoal leading-tight focus:outline-none text-input`}
              type="text"
              value={minutes}
              onFocus={handleFocus}
              onChange={onMinutesChangeCheck}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
