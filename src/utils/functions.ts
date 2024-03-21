import { useCallback } from "react";
export const handleScroll = useCallback(
  (e: any, throttledScroll: any, setPage: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if ((scrollTop + clientHeight) / scrollHeight >= 0.8) {
      if (!throttledScroll.current) {
        throttledScroll.current = setTimeout(() => {
          setPage((prev: number) => prev + 1);
          throttledScroll.current = null;
        }, 750);
      }
    }
  },
  []
);
