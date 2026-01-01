import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import "./ThemeSwitcher.css";

type ThemeSwitcherProps = {
  variant?: "default" | "mobile";
};

export default function ThemeSwitcher({
  variant = "default",
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <div className={`theme-switch-box theme-switch-box--${variant}`}>
      <div className="theme-buttons">
        <button
          className={`theme-switcher theme-switcher--${variant} ${
            theme === "night" ? "active" : ""
          }`}
          onClick={() => setTheme("night")}
          title="Night"
        >
          <img src="/Images/icon-moon.png" alt="Night" />
        </button>

        <button
          className={`theme-switcher theme-switcher--${variant} ${
            theme === "lost-lake" ? "active" : ""
          }`}
          onClick={() => setTheme("lost-lake")}
          title="Lost Lake"
        >
          <img src="/Images/icon_sunset.png" alt="Lost Lake" />
        </button>

        <button
          className={`theme-switcher theme-switcher--${variant} ${
            theme === "daylight" ? "active" : ""
          }`}
          onClick={() => setTheme("daylight")}
          title="Daylight"
        >
          <img src="/Images/icon_landscape.png" alt="Daylight" />
        </button>

        <button
          className={`theme-switcher theme-switcher--${variant} ${
            theme === "woods" ? "active" : ""
          }`}
          onClick={() => setTheme("woods")}
          title="Woods"
        >
          <img src="/Images/woods-icon.png" alt="Woods" />
        </button>
      </div>

      <div className="theme-names">
        <p className={`theme-label ${animate ? "show" : ""}`}>
          {theme.replace("-", " ")}
        </p>
      </div>
    </div>
  );
}
