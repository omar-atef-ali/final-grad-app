import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top
    window.scrollTo(0, 0);

    // Reset scroll positions of any scrollable container divs
    const scrollContainers = document.querySelectorAll(
      '[class*="content_wrapper"], [class*="main_content"], [class*="scroll"], main, aside, section'
    );
    scrollContainers.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}
