import "../styles/Navbar.scss";
import { useThemeContext } from "../context/ThemeContext";
import SunIcon from "../assets/icon-sun.svg";
import MoonIcon from "../assets/icon-moon.svg";

const Navbar = () => {
  const { theme, handleToggleChange } = useThemeContext();

  return (
    <div className="navbar">
      <h1>Todo</h1>
      <span onClick={handleToggleChange}>
        {theme === "light" ? (
          <img src={MoonIcon} alt="moon-icon" />
        ) : (
          <img src={SunIcon} alt="sun-icon" />
        )}
      </span>
    </div>
  );
};

export default Navbar;
