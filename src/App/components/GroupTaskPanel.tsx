import React, { useEffect, useState } from "react";
import Panel from "./Panel/Panel";
import {
  ListColumnData,
  ItemData,
} from "../../UIKit/CustomList/CustomListTypes";
import CustomList from "../../UIKit/CustomList/CustomList";
import Scripts from "../shared/utils/clientScripts";
import utils, { redirectSPA } from "../shared/utils/utils";
import { TermBuffer } from "../shared/types";

/** Панель Задачи моей группы */
function GroupTaskPanel() {
  /** Обработчик нажатия на номер задачи */
  const onClickNumberTask = async (props: ItemData) => {
    const taskId = props.info;
    if (!taskId) return;

    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    utils.setRequest(requestId);

    localStorage.setItem("taskId", taskId);
    // Переход
    const link = await Scripts.getRequestPagePath();
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
      fr: 124,
      isLink: true,
      onClick: onClickNumberTask,
      isSortable: true,
    }),
    new ListColumnData({
      name: "sla",
      code: "sla",
      fr: 154,
      isSortable: true,
      isIcon: true,
    }),
    new ListColumnData({
      name: "Срочность",
      code: "urgency",
      fr: 123,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusContragent",
      fr: 96,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Застрахованный",
      code: "insured",
      fr: 141.5,
    }),
    new ListColumnData({
      name: "Регион",
      code: "region",
      fr: 141.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "createdAt",
      fr: 148,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата контроля",
      code: "controlDate",
      fr: 148,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тип задачи",
      code: "type",
      fr: 141.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Вид задачи",
      code: "sort",
      fr: 141.5,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус задачи",
      code: "status",
      fr: 141.5,
      isSortable: true,
      isIcon: true,
    }),
    new ListColumnData({
      name: "Полис",
      code: "policy",
      fr: 150,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Исполнитель",
      code: "executor",
      fr: 141.5,
      isSortable: true,
    }),
  ];

  //количество задач
  const [elementsCount, setElementsCount] = useState<number>(0);
  const fetchElementsCount = async () => {
    const count = await Scripts.getCountTasksGroup();
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
        label={`Задачи моей группы`}
        description={elementsCount}
        getSlaStatus={Scripts.getSlaTasksGroup}
        isOpen={true}
      >
        <div style={{ padding: "0" }}>
          <CustomList
            columnsSettings={columns}
            getDataHandler={Scripts.getTasksGroup}
            isScrollable={false}

            slaBuffer={slaBuffer}
            updateSlaBuffer={updateSlaBuffer}
          />
        </div>
      </Panel>
    </div>
  );
}

export default GroupTaskPanel;
