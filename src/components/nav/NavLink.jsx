import { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const NavLink = ({ id, name, type = "category", children = [] }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = (e) => {
    !clicked && type === "category" && e.preventDefault();
    setClicked(!clicked);
  };
  const childList = children.map(({ id, name }) => (
    <li key={id}>
      <Link
        to={`${type}/${id}`}
        className="block w-[100%] p-[1rem] text-[1.4rem] uppercase font-[500] tracking-[0.13rem]"
      >
        {name}
      </Link>
    </li>
  ));

  return (
    <li className="border-[#ececec] border-b-[1px] overflow-hidden">
      <Link
        to={`${type}/${id}`}
        onClick={handleClick}
        className="block w-[100%] p-[2rem] text-[1.4rem] uppercase font-[600] tracking-[0.13rem] "
      >
        {name}
      </Link>
      {
        <CSSTransition
          in={clicked}
          classNames="grow-up"
          timeout={300}
          unmountOnExit
        >
          <ul className="ml-[2.4rem] overflow-hidden">{childList}</ul>
        </CSSTransition>
      }
    </li>
  );
};

export default NavLink;
