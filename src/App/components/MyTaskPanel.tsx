import React, { useEffect, useState } from "react";
import Panel from "./Panel/Panel";
import {
  ListColumnData,
  ItemData,
} from "../../UIKit/CustomList/CustomListTypes";
import CustomList from "../../UIKit/CustomList/CustomList";
import Scripts from "../shared/utils/clientScripts";
import utils, { redirectSPA } from "../shared/utils/utils";

/** Панель Мои Задачи */
function MyTaskPanel() {
  /** Обработчик нажатия на номер задачи */
  const onClickNumberTask = async (props: ItemData) => {
    const taskId = props.info;
    if (!taskId) return;

    // Запись текущего url в localStorage
    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );
    localStorage.setItem("medpultTaskId", taskId);
    //localStorage.setItem(localStorageDraftKey, JSON.stringify(data));
    // Переход
    const link = Scripts.getTaskPageCode();
    redirectSPA(link);
  };
  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Номер",
      code: "taskNumber",
      fr: 1,
      isLink: true,
      onClick: onClickNumberTask,
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
      name: "Срочность",
      code: "urgency",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusContragent",
      fr: 0.7,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Застрахованный",
      code: "insured",
      fr: 0.5,
    }),
    new ListColumnData({
      name: "Регион",
      code: "region",
      fr: 0.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "createdAt",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата контроля",
      code: "controlDate",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тип задачи",
      code: "type",
      fr: 0.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Вид задачи",
      code: "sort",
      fr: 0.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус задачи",
      code: "status",
      fr: 1,
      isSortable: true,
      isIcon: true,
    }),

    new ListColumnData({
      name: "Полис",
      code: "policy",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Ипсолнитель",
      code: "executor",
      fr: 0.5,
      isSortable: true,
    }),
  ];

  //количество задач
  const [elementsCount, setElementsCount] = useState<number>(0);
  const fetchElementsCount = async () => {
    const count = await Scripts.getCountMyTask();
    setElementsCount(count);
  };

  //статус sla задач
  const [statusSla, setStatusSla] = useState<number>(0);
  const fetchStatusSla = async () => {
    const count = await Scripts.getSlaMyTask();
    setStatusSla(count);
  };

  // Вычислить количество задач
  useEffect(() => {
    fetchElementsCount();
    fetchStatusSla();
  }, []);
  return (
    <div>
      <Panel
        label={`Мои Задачи`}
        description={elementsCount}
        additional={statusSla}
        isOpen={true}
      >
        <div style={{ padding: "0" }}>
          <CustomList
            columnsSettings={columns}
            getDataHandler={Scripts.getMyTask}
            isScrollable={false}
          />
        </div>
      </Panel>
    </div>
  );
}

export default MyTaskPanel;
