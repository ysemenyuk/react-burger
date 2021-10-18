import { useEffect } from 'react';

type TTargets = {
  [name: string]: HTMLElement | null;
};

export const useScroll = (
  containerRef: { current: HTMLUListElement | null },
  targetsRefs: { current: TTargets },
  callback: (entry: any) => void
) => {
  useEffect(() => {
    const targets = Object.values(targetsRefs.current);

    const options = {
      root: containerRef.current,
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    }, options);

    targets.forEach((el) => observer.observe(el as HTMLElement));

    return () => {
      targets.forEach((el) => observer.unobserve(el as HTMLElement));
    };
  }, [containerRef, targetsRefs, callback]);
};
