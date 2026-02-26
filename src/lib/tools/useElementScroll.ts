import { useEffect, useState } from "react";

export function useElementScroll(ref: React.RefObject<HTMLElement | null>) {
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setY(el.scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return y;
}