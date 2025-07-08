import React, { FC, useEffect, useRef, useState } from 'react';
import { Portal, Paper } from '@mui/material';
import clsx from 'clsx';
import s from './Tip.module.scss';

export type TipProps = {
  className?: string;
  children: React.ReactElement;
  title: React.ReactNode;
  container?: HTMLElement;
  place?: TipPlace;
  delayShow?: number;
  delayHide?: number;
};

export enum TipPlace {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

const calculatePosition = (
  holderRect: DOMRect,
  tip: HTMLDivElement,
  place: TipPlace
): { left: number; top: number } => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 8;
  const tipHeight = tip.clientHeight;
  const tipWidth = tip.clientWidth;

  let left = 0;
  let top = 0;

  switch (place) {
    case TipPlace.top:
      left = holderRect.left + holderRect.width / 2 - tipWidth / 2;
      top = holderRect.top - tipHeight - margin;
      break;
    case TipPlace.left:
      left = holderRect.left - tipWidth - margin;
      top = holderRect.top - holderRect.height / 2;
      break;
    case TipPlace.right:
      left = holderRect.right + margin;
      top = holderRect.top - holderRect.height / 2;
      break;
    case TipPlace.bottom:
      left = holderRect.left + holderRect.width / 2 - tipWidth / 2;
      top = holderRect.top + margin + tipHeight / 2;
      break;
  }

  const padding = 8;
  if (left < padding) left = padding;
  else if (left + tipWidth > viewportWidth - padding) left = viewportWidth - tipWidth - padding;
  if (top < padding) top = padding;
  else if (top + tipHeight > viewportHeight - padding) top = viewportHeight - tipHeight - padding;

  return { left, top };
};

const findBestPlacement = (
  holderRect: DOMRect,
  tip: HTMLDivElement,
  possiblePositions: TipPlace[],
  currentPlace: TipPlace
): TipPlace => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = 8;
  const tipWidth = tip.offsetWidth;
  const tipHeight = tip.offsetHeight;

  const calculateOverflow = (left: number, top: number) => {
    const overflowLeft = Math.max(0, -left + padding);
    const overflowRight = Math.max(0, left + tipWidth - (viewportWidth - padding));
    const overflowTop = Math.max(0, -top + padding);
    const overflowBottom = Math.max(0, top + tipHeight - (viewportHeight - padding));
    return overflowLeft + overflowRight + overflowTop + overflowBottom;
  };

  const getAvailableSpace = (place: TipPlace) => {
    switch (place) {
      case TipPlace.top:
        return holderRect.top;
      case TipPlace.bottom:
        return viewportHeight - holderRect.bottom;
      case TipPlace.left:
        return holderRect.left;
      case TipPlace.right:
        return viewportWidth - holderRect.right;
      default:
        return 0;
    }
  };

  const placementsWithScore = possiblePositions.map((place) => {
    const { left, top } = calculatePosition(holderRect, tip, place);
    const overflow = calculateOverflow(left, top);
    const availableSpace = getAvailableSpace(place);
    const spaceOK =
      place === TipPlace.top || place === TipPlace.bottom ? availableSpace >= tipHeight : availableSpace >= tipWidth;
    const score = spaceOK ? 0 : 10000 + overflow * 100 - availableSpace;
    return { place, overflow, availableSpace, spaceOK, score };
  });

  placementsWithScore.sort((a, b) => {
    if (a.spaceOK !== b.spaceOK) return a.spaceOK ? -1 : 1;
    if (a.overflow !== b.overflow) return a.overflow - b.overflow;
    return b.availableSpace - a.availableSpace;
  });

  for (const item of placementsWithScore) {
    if (item.place === currentPlace && item.spaceOK) return item.place;
  }
  return placementsWithScore[0].place;
};

export const Tip: FC<TipProps> = ({
  className,
  children,
  title,
  place = TipPlace.top,
  container = document.body,
  delayShow = 500,
  delayHide = 100,
}) => {
  const [state, setState] = useState({
    visible: false,
    mounted: false,
    position: { left: 0, top: 0 },
    place: place,
  });

  const timeoutId = useRef<number | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setState((prev) => ({ ...prev, mounted: true }));
    timeoutId.current = window.setTimeout(() => {
      if (holderRef.current && tipRef.current) {
        updatePosition();
        setState((prev) => ({ ...prev, visible: true }));
      }
    }, delayShow);
  };

  const handleMouseLeave = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => {
      setState((prev) => ({ ...prev, visible: false, mounted: false }));
    }, delayHide);
  };

  const updatePosition = () => {
    if (!holderRef.current || !tipRef.current) return;
    const holderRect = holderRef.current.getBoundingClientRect();
    const possiblePositions = [TipPlace.top, TipPlace.bottom, TipPlace.left, TipPlace.right];
    const bestPlace = findBestPlacement(holderRect, tipRef.current, possiblePositions, state.place);
    const newPosition = calculatePosition(holderRect, tipRef.current, bestPlace);
    setState((prev) => ({ ...prev, place: bestPlace, position: newPosition }));
  };

  const child = React.Children.only(children) as React.DetailedReactHTMLElement<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;

  const clonedChild = React.cloneElement(child, {
    ...child.props,
    ref: holderRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });

  useEffect(() => {
    if (!state.mounted || !holderRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (tipRef.current) {
        updatePosition();
      }
    });

    resizeObserver.observe(holderRef.current);

    const handleScroll = () => {
      if (tipRef.current) {
        updatePosition();
      }
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [state.mounted, container]);

  return (
    <>
      {clonedChild}
      {state.mounted && (
        <Portal container={container}>
          <Paper
            ref={tipRef}
            elevation={3}
            className={clsx(s.root, s[state.place], state.visible && s.visible, className)}
            style={{ left: `${state.position.left}px`, top: `${state.position.top}px` }}
            onMouseEnter={() => {
              if (timeoutId.current) window.clearTimeout(timeoutId.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {title}
          </Paper>
        </Portal>
      )}
    </>
  );
};
