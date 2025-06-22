import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Portal, Paper } from '@mui/material';
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

// Получить противоположное место
const getReversePlace = (place: TipPlace): TipPlace => {
  switch (place) {
    case TipPlace.top:
      return TipPlace.bottom;
    case TipPlace.bottom:
      return TipPlace.top;
    case TipPlace.left:
      return TipPlace.right;
    case TipPlace.right:
      return TipPlace.left;
    default:
      return place;
  }
};

// Вычислить позицию для заданного места
const calculatePosition = (
  holderRect: DOMRect,
  tip: HTMLDivElement,
  place: TipPlace
): { left: number; top: number } => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = 0;
  let top = 0;
  const margin = 8;
  const tipHeight = tip.clientHeight;
  const tipWidth = tip.clientWidth;

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

  // Проверка выхода за границы экрана
  const padding = 8;

  if (left < padding) {
    left = padding;
  } else if (left + tipWidth > viewportWidth - padding) {
    left = viewportWidth - tipWidth - padding;
  }

  if (top < padding) {
    top = padding;
  } else if (top + tipHeight > viewportHeight - padding) {
    top = viewportHeight - tipHeight - padding;
  }

  return {
    left: left,
    top: top,
  };
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
    // Очищаем предыдущий таймер, если он был
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    setState((prev) => ({ ...prev, mounted: true }));

    // Устанавливаем новый таймер
    timeoutId.current = window.setTimeout(() => {
      if (holderRef.current && tipRef.current) {
        const holderRect = holderRef.current.getBoundingClientRect();
        const newPosition = calculatePosition(holderRect, tipRef.current, state.place);
        setState((prev) => ({
          ...prev,
          visible: true,
          position: newPosition,
        }));
      }
    }, delayShow);
  };

  const handleMouseLeave = () => {
    // Очищаем предыдущий таймер, если он был
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    // Устанавливаем таймер для скрытия и размонтирования
    timeoutId.current = window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        visible: false,
        mounted: false,
      }));
    }, delayHide);
  };

  // Клонирование дочернего элемента
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

  // Автоматическое определение позиции
  useLayoutEffect(() => {
    if (tipRef.current && state.mounted && holderRef.current) {
      const tipRect = tipRef.current.getBoundingClientRect();
      const holderRect = holderRef.current.getBoundingClientRect();

      const rectContainer = container.getBoundingClientRect();
      const tipHeight = tipRef.current.clientHeight;
      const tipWidth = tipRef.current.clientWidth;

      setState((prev) => ({
        ...prev,
        position: {
          left: holderRect.x + holderRect.width / 2 - tipWidth / 2 - rectContainer.x,
          top: holderRect.y + tipHeight / 2 - rectContainer.y,
        },
      }));

      // Проверяем, помещается ли tooltip в текущем месте
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 8;
      let needsReverse = false;

      switch (state.place) {
        case TipPlace.top:
        case TipPlace.bottom:
          // Проверяем горизонтальные границы
          if (tipRect.left < padding || tipRect.right > viewportWidth - padding) {
            needsReverse = true;
          }
          break;

        case TipPlace.left:
        case TipPlace.right:
          // Проверяем вертикальные границы
          if (tipRect.top < padding || tipRect.bottom > viewportHeight - padding) {
            needsReverse = true;
          }
          break;
      }

      if (needsReverse) {
        const reversedPlace = getReversePlace(state.place);
        const newPosition = calculatePosition(holderRect, tipRef.current, reversedPlace);

        setState((prev) => ({
          ...prev,
          place: reversedPlace,
          position: newPosition,
        }));
      }
    }
  }, [state.mounted]);

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timeoutId.current) window.clearTimeout(timeoutId.current);
    };
  }, []);

  // Обновление позиции при изменении размеров окна
  useEffect(() => {
    if (!state.visible || !holderRef.current || !tipRef.current) return;

    const updatePosition = () => {
      const holderRect = holderRef.current!.getBoundingClientRect();
      const newPosition = calculatePosition(holderRect, tipRef.current!, state.place);

      setState((prev) => ({
        ...prev,
        position: newPosition,
      }));
    };

    // Подписка на scroll контейнера
    container.addEventListener('scroll', updatePosition);
    // Подписка на прокрутку окна
    window.addEventListener('scroll', updatePosition, true);
    // Подписка на изменение размера окна
    window.addEventListener('resize', updatePosition);

    return () => {
      container.removeEventListener('scroll', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [state.visible]);

  return (
    <>
      {clonedChild}
      {state.mounted && (
        <Portal container={container}>
          <Paper
            ref={tipRef}
            elevation={3}
            className={clsx(s.root, s[state.place], state.visible && s.visible, className)}
            style={{
              left: `${state.position.left}px`,
              top: `${state.position.top}px`,
            }}
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
