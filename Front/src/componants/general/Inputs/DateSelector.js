import { MonthSelector } from "@components/Filters/DateFilter/Selectors/MonthSelector";
import { YearSelector } from "@components/Filters/DateFilter/Selectors/YearSelector";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { getMonth, parseDate } from "@utils/TimeUtils";
import InputField from "./InputField";
import { DateTime } from "luxon";

const DateSelector = ({
  inputRef,
  title,
  titleStyle,
  value,
  onChange,
  style,
  focus,
  setFocus
}) => {
  const confPicker = () => {
    const days = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]; //start with dimanche
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return {
      locale: {
        localize: {
          day: (n) => days[n],
          month: (n) => months[n],
        },
        formatLong: {
          date: () => "mm/dd/yyyy",
        },
      },
      available: {
        data: null,
      },
    };
  };

  const config = confPicker();
  // const [focus, setFocus] = useState(false);
  const [activeMonth, setActiveMonth] = useState(false);
  const [activeYear, setActiveYear] = useState(false);
  const [startDate, setStartDate] = useState();
  const [current, setCurrent] = useState(new Date());

  const setSelectedDate = (date) => {
    setStartDate(date);
    console.log("date = ", DateTime.fromJSDate(date).toFormat("yyyy-MM-dd"));
    console.log("inputRef.current = ", inputRef.current.value);
    inputRef.current.value = DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");

    onChange({
      target: { value: DateTime.fromJSDate(date).toFormat("yyyy-MM-dd") },
    });
    setFocus(false);
  };

  const formatDate = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
    let newValue;
    if (e.target.value.length > 6) {
      newValue = `${e.target.value.slice(0, 4)}-${
        e.target.value.slice(4, 6) < 12 ? e.target.value.slice(4, 6) : 12
      }-${e.target.value.slice(6, 8) < 31 ? e.target.value.slice(6, 8) : 31}`;
    } else if (e.target.value.length > 4) {
      newValue = `${e.target.value.slice(0, 4)}-${
        e.target.value.slice(4, 6) < 12 ? e.target.value.slice(4, 6) : 12
      }`;
    }
    e.target.value = newValue ?? e.target.value;
    onChange(e);
  };

  return (
    <div className="relative" onFocus={() => setFocus(true)}>
      <InputField
        inputRef={inputRef}
        title={title}
        titleStyle={titleStyle}
        value={value}
        placeholder="YYYY-MM-DD"
        inputAutoComplete="off"
        onEnterPressed={() => 1}
        onChange={(e) => formatDate(e)}
        style={style}
      />
      {focus && (
        <div className="absolute z-[999] bg-white">
          {activeMonth && activeYear && (
            <YearSelector
              current={current}
              setCurrent={setCurrent}
              setYear={setActiveYear}
            />
          )}
          {activeMonth && !activeYear && (
            <MonthSelector
              current={current}
              setCurrent={setCurrent}
              setActiveMonth={setActiveMonth}
              setActiveYear={setActiveYear}
              locale={config.locale}
            />
          )}
          {!activeMonth && !activeYear && (
            <>
              <button
                className="button bg-white"
                onClick={() => setActiveMonth(true)}
              >
                {config.locale.localize.month(current.getMonth())}{" "}
                {current.toString().split(" ")[3]}
              </button>
              <DatePicker
                renderCustomHeader={() => null}
                disabledKeyboardNavigation
                selected={startDate}
                openToDate={current}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                inline
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default DateSelector;
