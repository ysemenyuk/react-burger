import React from 'react';

type TTargets = {
  [name: string]: HTMLElement | null;
};

export const useScroll = (
  containerRef: any,
  targetsRefs: TTargets,
  callback: (entry: any) => void
) => {
  React.useEffect(() => {
    // const container = containerRef;
    const targets = Object.values(targetsRefs);

    const options = {
      root: containerRef,
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

    // targets.forEach((el) => observer.observe(el));

    return () => {
      // targets.forEach((el) => observer.unobserve(el));
    };
  }, [containerRef, targetsRefs, callback]);
};
