"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react/dist/ssr";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("fortis-theme", next ? "light" : "dark");
  }

  return (
    <button
      type="button"
      aria-label={light ? "Dark Mode aktivieren" : "Light Mode aktivieren"}
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-full text-frost/60 transition-colors hover:text-frost"
    >
      {light ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
