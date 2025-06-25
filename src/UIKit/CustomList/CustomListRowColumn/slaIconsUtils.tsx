import React, { useEffect, useRef, useState } from "react";
import { TermBuffer, TermBufferStatus } from "../../../App/shared/types";

/** Получить иконку по статусу и по проценту */
export function getSlaIcon(slaStatusCode: TermBufferStatus, slaPercentage: number) {
  switch(slaStatusCode) {
    case TermBufferStatus.active: return getActiveIcon(slaPercentage)
    case TermBufferStatus.pause: return  getPauseIcon(slaPercentage)
    case TermBufferStatus.done: return  getDoneIcon(slaPercentage)
    default: return undefined
  }
}

/** Цвет иконки */
export enum SlaIconColor {
  /** Красный */
  Red = "#FF4545",
  /** Оранжевый */
  Orange = "#FF9F45",
  /** Зеленый */
  Green = "#2DD44B",
}

/** Получить цвет иконки */
function getSlaIconColor(percentage: number) {
  if (percentage === 0) {
    return SlaIconColor.Red;
  }
  if (percentage <= 30) {
    return SlaIconColor.Orange;
  }
  if (percentage <= 100) {
    return SlaIconColor.Green;
  }
}

/** Получить иконку активного счетчика */
function getActiveIcon(percentage: number) {
  const color = getSlaIconColor(percentage);

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 17C13.4184 17 17 13.4184 17 9C17 4.5816 13.4184 1 9 1C4.5816 1 1 4.5816 1 9C1 13.4184 4.5816 17 9 17Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 5L9.00342 9.00387L12 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Получить иконку счетчика выполнено */
function getDoneIcon(percentage: number) {
  const color = getSlaIconColor(percentage);

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.666 5.83398L8.33268 14.1673L4.16602 10.0007"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

/** Получить иконку счетчика на паузе */
function getPauseIcon(percentage: number) {
  const color = getSlaIconColor(percentage);

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.22266 5.33398V14.6673M12.7782 5.33398V14.6673"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
