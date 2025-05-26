
import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design that detects if a media query matches
 * @param query CSS media query string (e.g., "(max-width: 768px)")
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define callback for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Custom hook that detects if the current viewport is mobile-sized
 * @returns Boolean indicating if the viewport is mobile-sized (max-width: 768px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}
