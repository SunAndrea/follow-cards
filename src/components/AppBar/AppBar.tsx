import { NavLink } from "react-router-dom";
import css from "./AppBar.module.css";

const AppBar: React.FC = () => {
  return (
    <header className={css.headerWrapper}>
      <nav className={css.nav}>
        <NavLink className={css.link} to="/">
          Home
        </NavLink>
        <NavLink className={css.link} to="tweets">
          Tweets
        </NavLink>
      </nav>
    </header>
  );
};

export default AppBar;
