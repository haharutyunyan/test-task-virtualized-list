"use client";
import { useState, useEffect } from "react";
import {
  LARGE_SCREEN,
  LARGE_SCREEN_GRID,
  MID_SCREEN,
  MID_SCREEN_GRID,
  SMALL_SCREEN_GRID,
} from "@/app/constants";

function useWindowResize(): number {
  const WINDOW_WIDTH = typeof window !== "undefined" ? window.innerWidth : 0;
  const [windowWidth, setWindowWidth] = useState(WINDOW_WIDTH);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(WINDOW_WIDTH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getGridColumns = (): number => {
    if (windowWidth > LARGE_SCREEN) {
      return LARGE_SCREEN_GRID;
    }

    if (windowWidth > MID_SCREEN) {
      return MID_SCREEN_GRID;
    }

    return SMALL_SCREEN_GRID;
  };

  return getGridColumns();
}

export default useWindowResize;
