import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Header from "../header/Header";
import SideNav from "./nav/SideNav";
import Search from "../components/modals/Search";
import { getMenu } from "../services/menuServices";
import Footer from "../footer/Footer";

const Context = React.createContext();
const Layout = () => {
  const [openedSideNav, setOpenedSideNav] = useState(false);
  const [openedSearch, setOpenedSearch] = useState(false);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const menu_data = await getMenu();
      setMenu(menu_data);
    }

    fetchData();
  }, [openedSideNav]);

  const handleSideNav = () => {
    setOpenedSideNav(!openedSideNav);
  };
  const handleSearch = () => {
    setOpenedSearch(!openedSearch);
  };
  const closeSearch = () => {
    setOpenedSearch(false);
  };

  return (
    <Context.Provider value={{ closeSearch }}>
      <Header
        handleSideNav={handleSideNav}
        handleSearch={handleSearch}
        menu={menu}
      />
      <CSSTransition
        in={openedSideNav}
        classNames="slide-up"
        timeout={300}
        unmountOnExit
      >
        <SideNav menu={menu} handleSideNav={handleSideNav} />
      </CSSTransition>

      <CSSTransition
        in={openedSearch}
        timeout={300}
        classNames="slide-up"
        unmountOnExit
      >
        <Search handleSearch={handleSearch} />
      </CSSTransition>
      <main className="mt-[5.8rem]">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
};

export default Layout;
export { Context };
