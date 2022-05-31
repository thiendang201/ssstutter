import { capitalize } from "../utils/capitalizeString";

const Button = ({
  type = "primary",
  text,
  active = "",
  onclick,
  beforeColor,
}) => {
  if (type === "underline")
    return (
      <button
        onClick={onclick}
        className={`p-[1rem] relative font-semibold text-[1.6rem] btn-underline ${active} ${beforeColor}`}
      >
        {capitalize(text)}
      </button>
    );

  return <button></button>;
};

export default Button;
