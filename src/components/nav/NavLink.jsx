import { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const NavLink = ({
  id,
  name,
  type = "category",
  children = [],
  handleSideNav,
}) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = (e) => {
    const parentClicked = clicked && type === "category";
    const isNotCate = type !== "category";

    if (parentClicked || isNotCate) {
      handleSideNav();
      window.scrollTo(0, 0);
    }
    !clicked && !isNotCate && e.preventDefault();
    setClicked(!clicked);
  };

  const parentId = id;
  const childList = children.map(({ id, name }) => (
    <li key={id}>
      <Link
        onClick={() => {
          window.scrollTo(0, 0);
          handleSideNav();
        }}
        to={`${type}/${id}/${parentId}`}
        className="block w-[100%] p-[1rem] text-[1.4rem] uppercase font-[500] tracking-[0.13rem]"
      >
        {name}
      </Link>
    </li>
  ));

  return (
    <li className="border-[#ececec] border-b-[1px] md:border-b-0 overflow-hidden md:overflow-visible md:flex md:items-center">
      <Link
        to={`${type}/${id}`}
        onClick={window.innerWidth < 768 ? handleClick : undefined}
        className="block w-[100%] p-[2rem] md:py-[1rem] text-[1.4rem] uppercase font-[600] tracking-[0.13rem] md:text-center md:px-[2rem] relative before:bg-black before:absolute before:top-[100%] before:w-0 before:h-[0.3rem] before:left-0 before:content-[''] before:block before:transition-all before:duration-300 before:origin-left lg:hover:before:w-[100%] hover:before:rounded-full"
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
          <ul className="ml-[2.4rem] overflow-hidden md:hidden">{childList}</ul>
        </CSSTransition>
      }
    </li>
  );
};

export default NavLink;
