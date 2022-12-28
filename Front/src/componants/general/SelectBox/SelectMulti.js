import React ,{useState,useRef}from "react";
import InputField from './../Inputs/InputField';

const SelectMulti = ({ options,selectedValue,setSelectedValue, className,title,titleStyle,optional,optionalStyle,arrowStyle,margin}) => {
  const ref = useRef();
  const [popup, setPopup] = useState();
  if (className == null){
    className="min-w-[100px] p-1 px-4 border-solid border-green dark:bg-charleston-green focus-visible:outline-0 border-2 rounded-xl appearance-none"
    // className="`w-2/3 p-1 px-4 border-solid border-green dark:bg-charleston-green focus-visible:outline-0 border-2 rounded-xl appearance-none`"
  }
  const Option = ({key,option})=>{
    const [select,setSelect] = useState(false);
    return <option key={key} value={key} className={`${select ? "bg-green":"bg-gray-normal"}`} onSelect={()=>{setSelect(key);setSelectedValue([...selectedValue,key])}}>
    {option}
  </option>
  }
  return (
    <div className={`relative inline`}>
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
      <div className={arrowStyle ? arrowStyle : "absolute top-[10%] right-4 pointer-events-none"}>
        <img
          className="dark:menu-item"
          src={"/images/down-arrow.png"}
          alt="Profile"
          width={20}
          height={15}
        />
      </div>
        <div className={className} onClick={()=>setPopup(!popup)}></div>
        {popup && 
            <div className={`absolute w-[80%] mx-auto h-[100px] bg-red ${margin}`}></div>
          }
        {/* <option key={-1} value={-1} className="bg-gray-normal"></option>
        {options.map((option, key) => (
          <Option key={key} option={option}/>
        ))}
      </select> */}
    </div>
  );
};

export default SelectMulti;
