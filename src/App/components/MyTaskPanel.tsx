import React, { useEffect, useState } from "react";
import Panel from "./Panel/Panel";
import {
  ListColumnData,
  ItemData,
} from "../../UIKit/CustomList/CustomListTypes";
import CustomList from "../../UIKit/CustomList/CustomList";
//import Scripts from "../shared/utils/clientScripts";
import utils, { redirectSPA } from "../shared/utils/utils";
import { TermBuffer } from "../shared/types";

/** Панель Мои Задачи */
function MyTaskPanel() {
  /** Обработчик нажатия на номер задачи */
  const onClickNumberTask = async (props: ItemData) => {
    const taskId = props.info;
    if (!taskId) return;

    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    utils.setRequest(requestId);

    localStorage.setItem("taskId", taskId);
    //localStorage.setItem(localStorageDraftKey, JSON.stringify(data))

    // Переход
    const link = await Scripts.getRequestPagePath();
    // utils.redirectSPA(link)

    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    if (taskId) redirectUrl.searchParams.set("task_id", taskId);
    utils.redirectSPA(redirectUrl.toString());
  };
  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Номер",
      code: "taskNumber",
      fr: 1,
      fixedWidth: "124px",
      isLink: true,
      onClick: onClickNumberTask,
      isSortable: true,
    }),
    new ListColumnData({
      name: "sla",
      code: "sla",
      fr: 1,
      fixedWidth: "154px",
      isSortable: true,
      isIcon: true,
    }),
    new ListColumnData({
      name: "Срочность",
      code: "urgency",
      fr: 1,
      fixedWidth: "123px",
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusContragent",
      fr: 0.7,
      fixedWidth: "96px",
      isSortable: true,
    }),
    new ListColumnData({
      name: "Застрахованный",
      code: "insured",
      fr: 1,
    }),
    new ListColumnData({
      name: "Регион",
      code: "region",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "createdAt",
      fr: 1,
      fixedWidth: "148px",
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата контроля",
      code: "controlDate",
      fr: 1,
      fixedWidth: "148px",
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тип задачи",
      code: "type",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Вид задачи",
      code: "sort",
      fr: 1,
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
      fixedWidth: "150px",
      isSortable: true,
    }),
    new ListColumnData({
      name: "Исполнитель",
      code: "executor",
      fr: 1,
      isSortable: true,
    }),
  ];

  //количество задач
  const [elementsCount, setElementsCount] = useState<number>(0);
  const fetchElementsCount = async () => {
    const count = await Scripts.getCountMyTask();
    setElementsCount(count);
  };

  // Вычислить количество задач
  useEffect(() => {
    fetchElementsCount();
  }, []);

  const [slaBuffer, setSlaBuffer] = useState<TermBuffer[]>([])
  async function updateSlaBuffer(tasksIds: string[]) {
    const terms = await Scripts.getTasksResolutionTerms(tasksIds)
    setSlaBuffer(terms)
  }
  
  return (
    <div>
      <Panel
        label={`Мои Задачи`}
        description={elementsCount}
        getSlaStatus={Scripts.getSlaMyTask}
        isOpen={true}
      >
        <div style={{ padding: "0" }}>
          <CustomList
            columnsSettings={columns}
            getDataHandler={Scripts.getMyTask}
            isScrollable={false}

            slaBuffer={slaBuffer}
            updateSlaBuffer={updateSlaBuffer}
          />
        </div>
      </Panel>
    </div>
  );
}

export default MyTaskPanel;
