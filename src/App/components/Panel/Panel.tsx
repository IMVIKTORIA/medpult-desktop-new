import React, { useEffect, useState } from "react";
import Loader from "../../../UIKit/Loader/Loader";

type PanelProps = {
  children?: any,
  label: any,
  description: any,
  // additional: number,
  isRollable?: boolean,
  isOpen: boolean,
  getSlaStatus: () => Promise<number>
}

/** Сворачиваемая панель */
function Panel({
  children,
  label = "",
  description,
  // additional,
  isRollable = true,
  isOpen = true,
  getSlaStatus
}: PanelProps) {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(isOpen);

  const [statusSla, setStatusSla] = useState<number | undefined>(undefined);
  const fetchStatusSla = async () => {
    const count = await getSlaStatus();
    setStatusSla(count);
  };
  useEffect(() => {
    // Обновление SLA
    fetchStatusSla();

    // Запуск обновления SLA каждую минуту
    const intervalId = setInterval(() => {
      try {
        fetchStatusSla();
      } catch(e) {
        clearInterval(intervalId);
      }
    }, 60000)
  }, []);


  const getColor = () => {
    const statusValue = statusSla ?? 0;
    
    if (statusValue < 70) return "#FF4545"; //красный
    if (statusValue <= 90) return "#FF9F45"; //желтый
    return "#21A038"; //зеленый
  };

  const handleClick = () => {
    if (!isRollable) return;
    setIsPanelOpen(!isPanelOpen);
  };

  let triangleElement: any = null;
  if (isRollable) {
    triangleElement = (
      <span
        className={
          isPanelOpen
            ? "medpult-panel__triangle medpult-panel__triangle_open"
            : "medpult-panel__triangle"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#2f91e3"
          height="20px"
          width="20px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 490 490"
          xmlSpace="preserve"
        >
          <polygon points="245,456.701 490,33.299 0,33.299 " />
        </svg>
      </span>
    );
  }

  return (
    <div className="medpult-panel">
      <div
        className={
          isPanelOpen
            ? "medpult-panel__header"
            : "medpult-panel__header medpult-panel__header_closed"
        }
        style={isRollable ? { cursor: "pointer" } : { cursor: "text" }}
        onClick={handleClick}
      >
        <span className="medpult-panel__label">
          {label}
          {typeof description === "number" && (
            <div className="medpult-panel__description"> {description}</div>
          )}
        </span>
        <div className="medpult-panel__additional">
          <span>SLA:</span>
          {
            statusSla != undefined
            ? <span style={{ color: getColor() }}>{statusSla}%</span>
            : <Loader/>
          }
        </div>
        {triangleElement}
      </div>
      <div
        className={
          isPanelOpen
            ? "medpult-panel__content"
            : "medpult-panel__content_hidden"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default Panel;
