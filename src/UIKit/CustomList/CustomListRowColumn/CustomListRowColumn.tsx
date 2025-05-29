import React, { useEffect, useRef, useState } from "react";
import { ItemData, ListColumnData } from "../CustomListTypes";
import icons from "../../../App/shared/icons";

interface ListColumnProps extends ListColumnData {
  data: ItemData<any>;
  listRef?: React.RefObject<HTMLDivElement>;
}

function CustomListRowColumn(props: ListColumnProps) {
  const { fr, data, isLink, onClick, isIcon, code } = props;

  const onClickColumn =
    isLink && onClick
      ? () => {
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

  function getSlaIcon(code: string) {
    if (code === "1") {
      return icons.TimeOutlineRed;
    }
    if (code === "2") {
      return icons.TimeOutlineOrange;
    }
    if (code === "3") {
      return icons.TimeOutlineGreen;
    }
  }
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

  const slaIcon = code === "sla" ? getSlaIcon(data?.info) : undefined;
  const statusIcon = code === "status" ? getStatusIcon(data?.info) : undefined;
  const statusContragentColor =
    code === "statusContragent"
      ? getStatusContragentColor(data?.info)
      : undefined;
  const statusColor =
    code === "appealStatus" ? getStatusColor(data?.info) : undefined;

  return (
    <div
      className={
        isLink
          ? "custom-list-row-column custom-list-row-column__link"
          : "custom-list-row-column"
      }
      style={{
        flex: fr,
        minWidth: 0,
      }}
    >
      <span
        title={displayValue}
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
          {displayValue}
        </span>
      </span>
    </div>
  );
}

export default CustomListRowColumn;
