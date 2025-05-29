import React, { useEffect, useState } from "react";
import Panel from "./Panel/Panel";
import {
  ListColumnData,
  ItemData,
} from "../../UIKit/CustomList/CustomListTypes";
import CustomList from "../../UIKit/CustomList/CustomList";
import Scripts from "../shared/utils/clientScripts";
import utils, { redirectSPA } from "../shared/utils/utils";

/** Панель Обращения */
function RequestsPanel() {
  /** Обработчик нажатия на номер обращения */
  const onClickNumberRequest = async (props: ItemData) => {
    const requestId = props.info;
    if (!requestId) return;

    // Запись текущего url в localStorage
    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );
    localStorage.setItem("medpultRequestId", requestId);
    //localStorage.setItem(localStorageDraftKey, JSON.stringify(data));
    // Переход
    const link = Scripts.getRequestPagePath();
    redirectSPA(link);
  };
  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Номер",
      code: "appealNumber",
      fr: 1,
      isLink: true,
      onClick: onClickNumberRequest,
      isSortable: true,
    }),
    new ListColumnData({
      name: "sla",
      code: "sla",
      fr: 1,
      isSortable: true,
      isIcon: true,
    }),
    new ListColumnData({
      name: "Канал",
      code: "appealChannel",
      fr: 0.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusContragent",
      fr: 0.7,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Email",
      code: "appealEmail",
      fr: 0.5,
    }),
    new ListColumnData({
      name: "Тема обращения",
      code: "appealTheme",
      fr: 0.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "appealCreatedAt",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Обратившийся",
      code: "objContragent",
      fr: 0.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "appealStatus",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата последнего взаимодействия",
      code: "dateInteraction",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Полис",
      code: "policy",
      fr: 1,
      isSortable: true,
    }),

    new ListColumnData({
      name: "Причина обращения",
      code: "appealReason",
      fr: 0.5,
      isSortable: true,
    }),
  ];

  //количество обращений
  const [elementsCount, setElementsCount] = useState<number>(0);
  const fetchElementsCount = async () => {
    const count = await Scripts.getCountRequests();
    setElementsCount(count);
  };

  //статус sla обращений
  const [statusSla, setStatusSla] = useState<number>(0);
  const fetchStatusSla = async () => {
    const count = await Scripts.getSlaRequests();
    setStatusSla(count);
  };

  // Вычислить количество обращений
  useEffect(() => {
    fetchElementsCount();
    fetchStatusSla();
  }, []);
  return (
    <div>
      <Panel
        label={`Обращения`}
        description={elementsCount}
        additional={statusSla}
        isOpen={true}
      >
        <div style={{ padding: "0" }}>
          <CustomList
            columnsSettings={columns}
            getDataHandler={Scripts.getRequests}
            isScrollable={false}
          />
        </div>
      </Panel>
    </div>
  );
}

export default RequestsPanel;
