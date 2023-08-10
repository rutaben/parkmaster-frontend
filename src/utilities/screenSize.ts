import { useEffect, useState } from "react";

const desktopWidth = 1280;

export interface ScreenSize {
  dynamicWidth: number;
  dynamicHeight: number;
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, []);

  return screenSize;
};

export const isDesktop = (width: number): boolean => {
  return width > desktopWidth;
};
