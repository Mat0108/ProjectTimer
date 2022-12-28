
/**
 * The variable contains app Input username's component
 * @returns InputField
 */
const InputField = ({
  inputRef,
  value,
  onChange,
  error,
  title,
  titleStyle,
  onEnterPressed,
  onFocus,
  placeholder,
  style,
  icon,
  inputType,
  inputMin,
  inputMax,
  inputAutoComplete,
  pattern,
  maxLength,
  optional,
  optionalstyle,
  isDesc,
  inputStep,
  className

}) => {
  return (
    <div className={style || "w-96"}>
      {title && (
        <div className="py-1 flex flex-row">
          <label className={titleStyle ||"title label-input"} htmlFor="username">
            {title}
          </label>
          {optional && (
          <label className={optionalstyle ||"title label-input text-gray-silver"} htmlFor="username">
            {optional}
          </label>
        )}
        </div>
      )}
      
      <div className="flex relative">
        {icon && (
          <div className="absolute ml-4">
            <img
              className="dark:menu-item h-auto"
              src={icon}
              alt="Mail"
              width={18}
              height={20}
            />
          </div>
        )}
        <input
          ref={inputRef}
          placeholder={placeholder}
          style={
            error
              ? { border: "1px solid #C33131" }
              : { border: "1px solid #6EC331" }
          }
          className={`${className ? className :`bg-white2 dark:bg-charcoal ${icon ? 'pl-10' : 'pl-5'} rounded-md w-full ${isDesc ? 'h-32' : 'h-12'} py-2 px-3 leading-tight focus:outline-none text-input text-black`} `}
          name="username"
          type={inputType ? inputType : "email"}
          min={inputMin}
          max={inputMax}
          autoComplete={inputAutoComplete}
          pattern={pattern}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          step={inputStep}
          onKeyDown= {(event) => {
            if (onEnterPressed && event.key === "Enter") {
              onEnterPressed(event);
            }
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
