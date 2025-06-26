import React, { useEffect, useRef, useState } from "react";
import { ItemData, ListColumnData } from "../CustomListTypes";
import icons from "../../../App/shared/icons";
import { TermBuffer } from "../../../App/shared/types";
import { getSlaPercentage } from "../../../App/shared/utils/utils";
import { getSlaIcon } from "./slaIconsUtils";

interface ListColumnProps extends ListColumnData {
  data: ItemData<any>;
  listRef?: React.RefObject<HTMLDivElement>;  
  slaData?: TermBuffer
}

// Функция чтобы дни, часы, минуты было в формате 00
function padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
}


function CustomListRowColumn(props: ListColumnProps) {
  const { fr, data, isLink, onClick, isIcon, code, slaData, fixedWidth } = props;
  
  //Функция для преобразования вывода SLA
  function formatDuration(totalMinutes: number): string {
      const isNegative = totalMinutes < 0;
      const absMinutes = Math.abs(totalMinutes); // модуль числа
  
      // Вычисляем дни, часы, минуты 
      const days = Math.floor(absMinutes / (60 * 24));
      const hours = Math.floor((absMinutes % (60 * 24)) / 60);
      const minutes = Math.floor(absMinutes % 60);
  
      // Добавляем знак "-" для отрицательной разницы
      const result = `${padZero(days)}д ${padZero(hours)}ч ${padZero(minutes)}м`;
      return isNegative ? `-${result}` : result;
  }

  const onClickColumn =
    isLink && onClick
      ? (e: React.MouseEvent) => {
          e.stopPropagation();
          onClick(data);
        }
      : () => {};

  function formatNumber(text: string): string {
    if (text.length <= 10) {
      return text;
    }
    const prefix = text.slice(0, 2);
    const suffix = text.slice(-7);
    return `${prefix}...${suffix}`;
  }

  function formatPolicy(policy: string): string {
    if (policy.length <= 12) return policy;
    const prefix = policy.slice(0, 6);
    const suffix = policy.slice(-5);
    return `${prefix}...${suffix}`;
  }

  // function getSlaIcon(percentage: number) {
  //   if (percentage === 0) {
  //     return icons.TimeOutlineRed;
  //   }
  //   if (percentage <= 30) {
  //     return icons.TimeOutlineOrange;
  //   }
  //   if (percentage <= 100) {
  //     return icons.TimeOutlineGreen;
  //   }
  // }
  
  function getStatusContragentColor(info: string) {
    switch (info) {
      case "Gold":
        return "#DBB900";
      case "Silver":
        return "#9A9A9A";
      case "Platinum":
        return "#665A44";
      default:
    }
  }

  function getStatusColor(info: string) {
    switch (info) {
      case "sozdano":
        return "#E7F5B6";
      case "returned":
        return "#F5ECB6";
      default:
    }
  }

  function getStatusIcon(code: string) {
    if (code === "atWork") {
      return icons.StatusAtWork;
    }
    if (code === "queue") {
      return icons.StatusQueue;
    }
  }

  let displayValue: string;

  if (typeof data === "string") {
    displayValue = data;
  } else if (code === "appealNumber" || code === "taskNumber") {
    displayValue = formatNumber(data?.value ?? "");
  } else if (code === "policy") {
    displayValue = formatPolicy(data?.value ?? "");
  } else {
    displayValue = data?.value ?? "";
  }

  // Расчет SLA
  // Значение SLA - день час минута
  const slaValueStr = slaData?.slaValue ? formatDuration(slaData.minutesRemaining) : undefined;
  // Процент SLA оставшееся время / значение SLA
  const slaPercentage = slaData?.slaValue != undefined ? getSlaPercentage(slaData) : undefined;
  // Иконка SLA
  const slaIcon = (code === "sla" && slaPercentage != undefined && slaData) ? getSlaIcon(slaData.status, slaPercentage) : undefined;

  // Логика для статусов
  const statusIcon = code === "status" ? getStatusIcon(data?.info) : undefined;
  const statusContragentColor =
    code === "statusContragent"
      ? getStatusContragentColor(data?.info)
      : undefined;
  const statusColor =
    code === "appealStatus" ? getStatusColor(data?.info) : undefined;

  /** Получить отображаемое значение колонки */
  function getColumnValue() {
    switch(code) {
      case "sla": return slaValueStr
      default: return displayValue;
    }
  }

  /** Получить отображаемую подсказку колонки */
  function getColumnHint() {
    switch(code) {
      case "sla": return slaValueStr
      default: return data?.value;
    }
  }

  return (
    <div
      className={
        isLink
          ? "custom-list-row-column custom-list-row-column__link"
          : "custom-list-row-column"
      }
      style={{
        ...(fixedWidth ? { width: fixedWidth } : { flex: fr }),
        minWidth: 0,
      }}
    >
      <span
        title={getColumnHint()}
        onClick={onClickColumn}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          maxWidth: "100%",
          color: statusContragentColor,
          ...(code === "appealStatus" && {
            backgroundColor: statusColor,
            padding: "3px 16px",
            borderRadius: "12px",
          }),
        }}
      >
        {(isIcon && slaIcon) || (isIcon && statusIcon)}
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {getColumnValue()}
        </span>
      </span>
    </div>
  );
}

export default CustomListRowColumn;
