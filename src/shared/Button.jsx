import { capitalize } from "../utils/capitalizeString";

const Button = ({
  type = "primary",
  text,
  active = "",
  onclick,
  beforeColor,
  className,
}) => {
  if (type === "underline")
    return (
      <button
        onClick={onclick}
        className={`p-[1rem] relative font-semibold text-[1.6rem] md:text-[1.8rem] btn-underline ${active} ${beforeColor} hover:active`}
      >
        {capitalize(text)}
      </button>
    );

  if (type === "outline")
    return (
      <button
        onClick={onclick}
        className={`p-[1rem] relative font-semibold text-[1.6rem] md:text-[1.8rem] border border-black rounded-[0.4rem] ${className}`}
      >
        {text}
      </button>
    );

  return (
    <button
      onClick={onclick}
      className={`p-[1rem] relative font-semibold text-white text-[1.6rem] md:text-[1.8rem] bg-black rounded-[0.4rem] ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
