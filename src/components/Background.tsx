import BgDesktopLight from "../assets/bg-desktop-light.jpg";
import BgDesktopDark from "../assets/bg-desktop-dark.jpg";
import BgMobileLight from "../assets/bg-mobile-light.jpg";
import BgMobileDark from "../assets/bg-mobile-dark.jpg";
import "../styles/Background.scss";
import { useThemeContext } from "../context/ThemeContext";

const Background = () => {
  const { theme } = useThemeContext();
  const isDarkMode = theme === "dark";
  const isMobile = window.innerWidth <= 768;
  let bgImg = "";

  if (isDarkMode && !isMobile) {
    bgImg = BgDesktopDark;
  }
  if (isDarkMode && isMobile) {
    bgImg = BgMobileDark;
  }
  if (!isDarkMode && !isMobile) {
    bgImg = BgDesktopLight;
  }
  if (!isDarkMode && isMobile) {
    bgImg = BgMobileLight;
  }

  return (
    <div className="background">
      <img src={bgImg} alt="todo-background" />
    </div>
  );
};

export default Background;
