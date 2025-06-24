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

// Найти лучшее место для позиционирования Tip
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

  // Функция для расчёта "скрытости" подсказки
  const calculateOverflow = (left: number, top: number) => {
    const overflowLeft = Math.max(0, -left + padding);
    const overflowRight = Math.max(0, left + tipWidth - (viewportWidth - padding));
    const overflowTop = Math.max(0, -top + padding);
    const overflowBottom = Math.max(0, top + tipHeight - (viewportHeight - padding));

    return {
      total: overflowLeft + overflowRight + overflowTop + overflowBottom,
    };
  };

  // Функция для расчёта доступного пространства в направлении позиции
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

  // Оценка каждой позиции
  const placementsWithScore = possiblePositions.map((place) => {
    const { left, top } = calculatePosition(holderRect, tip, place);
    const { total: overflow } = calculateOverflow(left, top);
    const availableSpace = getAvailableSpace(place);

    // Проверяем, достаточно ли места в направлении позиции
    let spaceOK = false;
    switch (place) {
      case TipPlace.top:
      case TipPlace.bottom:
        spaceOK = availableSpace >= tipHeight; // достаточно вертикального места
        break;
      case TipPlace.left:
      case TipPlace.right:
        spaceOK = availableSpace >= tipWidth; // достаточно горизонтального места
        break;
    }

    // Приоритет: наличие места → минимальный overflow → максимальное доступное пространство
    const score = spaceOK ? 0 : 10000 + overflow * 100 - availableSpace;

    return {
      place,
      overflow,
      availableSpace,
      spaceOK,
      score,
    };
  });

  // Сортировка: сначала позиции с достаточным местом, затем по наименьшему overflow и наибольшему availableSpace
  placementsWithScore.sort((a, b) => {
    if (a.spaceOK !== b.spaceOK) {
      return a.spaceOK ? -1 : 1; // позиции с достаточным местом выше
    }
    if (a.overflow !== b.overflow) {
      return a.overflow - b.overflow; // меньший overflow
    }
    return b.availableSpace - a.availableSpace; // большее доступное пространство
  });

  // Проверяем, подходит ли текущая позиция
  for (const item of placementsWithScore) {
    if (item.place === currentPlace && item.spaceOK) {
      return item.place;
    }
  }

  return placementsWithScore[0].place;
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
  useEffect(() => {
    setTimeout(() => {
      if (!state.mounted || !holderRef.current || !tipRef.current) return;

      const holderRect = holderRef.current.getBoundingClientRect();
      const tipRect = tipRef.current.getBoundingClientRect();

      // Получаем список всех возможных позиций
      const possiblePositions = [TipPlace.top, TipPlace.bottom, TipPlace.left, TipPlace.right];

      // Находим оптимальное место
      const bestPlace = findBestPlacement(holderRect, tipRef.current, possiblePositions, place);

      if (bestPlace !== state.place) {
        const newPosition = calculatePosition(holderRect, tipRef.current, bestPlace);
        setState((prev) => ({
          ...prev,
          place: bestPlace,
          position: newPosition,
        }));
      } else {
        const newPosition = calculatePosition(holderRect, tipRef.current, state.place);
        setState((prev) => ({
          ...prev,
          position: newPosition,
        }));
      }
    }, 0);
  }, [state.mounted]);

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timeoutId.current) window.clearTimeout(timeoutId.current);
    };
  }, []);

  // Автоматическое обновление позиции подсказки при изменении размера окна
  useEffect(() => {
    if (!tipRef.current || !state.visible) return;

    const observer = new ResizeObserver(() => {
      if (holderRef.current && tipRef.current) {
        const holderRect = holderRef.current.getBoundingClientRect();
        const newPosition = calculatePosition(holderRect, tipRef.current!, state.place);
        setState((prev) => ({ ...prev, position: newPosition }));
      }
    });

    observer.observe(tipRef.current);

    return () => observer.disconnect();
  }, [state.visible]);

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
