"use client";
import { useRef, useState, useEffect, useCallback, RefObject } from "react";

const useScrollAware = (): [number, RefObject<HTMLDivElement>] => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);

  const onScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      setScrollTop(target.scrollTop);
    });
  }, []);

  useEffect(() => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      setScrollTop(scrollContainer.scrollTop);
      scrollContainer.addEventListener("scroll", onScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", onScroll);
      }
    };
  }, [onScroll]);

  return [scrollTop, ref];
};
export default useScrollAware;
