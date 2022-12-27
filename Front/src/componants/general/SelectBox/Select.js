import React from "react";
import Image  from "next/future/image";

const Select = ({ options,selectedValue,setSelectedValue, className,title,titleStyle,optional,optionalStyle,arrowStyle}) => {
  if (className == null){
    className="min-w-[100px] p-1 px-4 border-solid border-green dark:bg-charleston-green focus-visible:outline-0 border-2 rounded-xl appearance-none"
    // className="`w-2/3 p-1 px-4 border-solid border-green dark:bg-charleston-green focus-visible:outline-0 border-2 rounded-xl appearance-none`"
  }
  return (
    <div className="relative inline">
      {title && (
        <div className="py-1 flex flex-row">
          <label
            className={titleStyle || "title label-input"}
            htmlFor="selectBox"
          >
            {title}
          </label>
          {optional && (
            <label
              className={optionalStyle || "title label-input text-gray-silver"}
              htmlFor="selectBox"
            >
              {optional}
            </label>
          )}
        </div>
      )}
      <div className={arrowStyle ?? "absolute top-[30%] right-4 pointer-events-none"}>
        <Image
          className="dark:menu-item"
          src={"/images/General/Arrow-down.svg"}
          alt="Profile"
          width={20}
          height={15}
        />
      </div>
      <select
        className={className}
        value={selectedValue}
        onChange={(e) => {
            setSelectedValue(e.target.value);
        }}
      >
        <option key={-1} value={-1}></option>
        {options.map((option, key) => (
          <option key={key} value={key}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
