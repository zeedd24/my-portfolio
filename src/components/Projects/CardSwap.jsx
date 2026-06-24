import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

/* ---------- Card ---------- */
export const Card = forwardRef(({ customClass, children, style, onClick, className, ...rest }, ref) => (
  <div
    ref={ref}
    style={style}
    onClick={onClick}
    className={`card ${customClass ?? ''} ${className ?? ''}`.trim()}
    {...rest}
  >
    {children}
  </div>
));
Card.displayName = 'Card';

/* ---------- helpers ---------- */
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

/* ---------- CardSwap ---------- */
const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 2000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  showNav = true,
  children,
}) => {
  const elasticCfg = {
    ease: 'elastic.out(0.6,0.9)',
    durDrop: 1.2,
    durMove: 1.2,
    durReturn: 1.2,
    promoteOverlap: 0.9,
    returnDelay: 0.05,
  };
  const powerCfg = {
    ease: 'power1.inOut',
    durDrop: 0.6,
    durMove: 0.6,
    durReturn: 0.6,
    promoteOverlap: 0.45,
    returnDelay: 0.2,
  };
  const config = easing === 'elastic' ? elasticCfg : powerCfg;

  const childArr = useMemo(() => Children.toArray(children), [children]);

  const refs = useRef([]);
  if (refs.current.length !== childArr.length) {
    refs.current = Array.from(
      { length: childArr.length },
      (_, i) => refs.current[i] ?? React.createRef()
    );
  }

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(null);
  const container = useRef(null);
  const isAnimating = useRef(false);

  /* ---- Core animation: move front card to back (FORWARD) ---- */
  const swapForward = () => {
    if (order.current.length < 2 || isAnimating.current) return;
    isAnimating.current = true;

    const [front, ...rest] = order.current;
    const elFront = refs.current[front]?.current;
    if (!elFront) { isAnimating.current = false; return; }

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });
    tlRef.current = tl;

    tl.to(elFront, { y: '+=550', duration: config.durDrop, ease: config.ease });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs.current[idx]?.current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.current.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
        `promote+=${i * 0.12}`
      );
    });

    const backSlot = makeSlot(refs.current.length - 1, cardDistance, verticalDistance, refs.current.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');
    tl.to(
      elFront,
      { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease },
      'return'
    );

    tl.call(() => { order.current = [...rest, front]; });
  };

  /* ---- Reverse: move back card to front (BACKWARD / UNDO) ---- */
  const swapBackward = () => {
    if (order.current.length < 2 || isAnimating.current) return;
    isAnimating.current = true;

    const last = order.current[order.current.length - 1];
    const elLast = refs.current[last]?.current;
    if (!elLast) { isAnimating.current = false; return; }

    const newOrder = [last, ...order.current.slice(0, -1)];

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });
    tlRef.current = tl;

    /* 1. Slide the back card in from below */
    const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.current.length);
    gsap.set(elLast, { y: '+=550', zIndex: refs.current.length });
    tl.to(elLast, {
      x: frontSlot.x,
      y: frontSlot.y,
      z: frontSlot.z,
      duration: config.durReturn,
      ease: config.ease,
    });

    /* 2. Push remaining cards back one slot */
    tl.addLabel('demote', `-=${config.durReturn * 0.8}`);
    order.current.slice(0, -1).forEach((idx, i) => {
      const el = refs.current[idx]?.current;
      if (!el) return;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.current.length);
      tl.set(el, { zIndex: slot.zIndex }, 'demote');
      tl.to(
        el,
        { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
        `demote+=${i * 0.08}`
      );
    });

    tl.call(() => { order.current = newOrder; });
  };

  /* ---- Auto-cycle interval ---- */
  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(swapForward, delay);
  };

  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const total = refs.current.length;
    if (total === 0) return;

    refs.current.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });

    const firstTimeout = setTimeout(() => {
      swapForward();
      startInterval();
    }, 1200);

    let cleanupHover = () => {};
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => { tlRef.current?.pause(); stopInterval(); };
      const resume = () => { tlRef.current?.resume(); startInterval(); };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      cleanupHover = () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
      };
    }

    return () => {
      clearTimeout(firstTimeout);
      stopInterval();
      tlRef.current?.kill();
      cleanupHover();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length]);

  /* Nav button handlers (pause auto-cycle while manually navigating) */
  const handlePrev = () => {
    stopInterval();
    swapBackward();
    startInterval();
  };

  const handleNext = () => {
    stopInterval();
    swapForward();
    startInterval();
  };

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs.current[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div className="card-swap-root">
      <div ref={container} className="card-swap-container" style={{ width, height }}>
        {rendered}
      </div>

      {showNav && childArr.length > 1 && (
        <div className="card-swap-nav">
          <button
            className="cs-nav-btn"
            onClick={handlePrev}
            title="Previous card"
            aria-label="Previous card"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <span className="cs-nav-dots">
            {childArr.map((_, i) => (
              <span key={i} className="cs-nav-dot" />
            ))}
          </span>

          <button
            className="cs-nav-btn"
            onClick={handleNext}
            title="Next card"
            aria-label="Next card"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardSwap;
