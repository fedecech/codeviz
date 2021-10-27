import { useMediaQuery } from "react-responsive";

export enum ScreenType {
  mobile = "mobile",
  tablet = "tablet",
  desktop = "desktop",
}
/*
 * Screen type, default mobile
 */
export const useScreenType = (): ScreenType => {
  const tablet = useMediaQuery({ minWidth: 768 });
  const desktop = useMediaQuery({ minWidth: 1024 });

  if (tablet) return ScreenType.tablet;
  else if (desktop) return ScreenType.desktop;

  return ScreenType.mobile;
};
