import { useState, useEffect } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";

const BREAKPOINTS = {
  mobile: 360,
  tablet: 768,
} as const;

export function useDeviceType() {
  const size = useWindowSize();
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    aspectRatio: 0,
  });

  useEffect(() => {
    if (!size.width || !size.height) return;

    const width = size.width;
    const height = size.height;
    const aspectRatio = width / height;

    // Primary detection based on width
    let isMobile = width < BREAKPOINTS.mobile;
    let isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
    let isDesktop = width >= BREAKPOINTS.tablet;

    // Aspect ratio refinements
    // Portrait tablet/large phone edge case
    if (isTablet && aspectRatio < 0.8) {
      isMobile = true;
      isTablet = false;
    }
    
    // Ultrawide desktop in tablet range
    if (isTablet && aspectRatio > 2.0) {
      isTablet = false;
      isDesktop = true;
    }

    setDeviceType({
      isMobile,
      isTablet,
      isDesktop,
      aspectRatio,
    });
  }, [size.width, size.height]);

  return deviceType;
}