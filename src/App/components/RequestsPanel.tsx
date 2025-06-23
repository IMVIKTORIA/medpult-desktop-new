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

/** Панель Обращения */
function RequestsPanel() {
  /** Обработчик нажатия на номер обращения */
  const onClickNumberRequest = async (props: ItemData) => {
    const requestId = props.info;
    if (!requestId) return;

    utils.setRequest(requestId);

    const link = Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    utils.redirectSPA(redirectUrl.toString());
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

  // Вычислить количество обращений
  useEffect(() => {
    fetchElementsCount();
  }, []);

  const [slaBuffer, setSlaBuffer] = useState<TermBuffer[]>([])
  async function updateSlaBuffer(requestsIds: string[]) {
    const terms = await Scripts.getRequestsProcessingTerms(requestsIds)
    setSlaBuffer(terms)
  }

  return (
    <div>
      <Panel
        label={`Обращения`}
        description={elementsCount}
        getSlaStatus={Scripts.getSlaRequests}
        isOpen={true}
      >
        <div style={{ padding: "0" }}>
          <CustomList
            columnsSettings={columns}
            getDataHandler={Scripts.getRequests}
            isScrollable={false}

            updateSlaBuffer={updateSlaBuffer}
            slaBuffer={slaBuffer}
          />
        </div>
      </Panel>
    </div>
  );
}

export default RequestsPanel;
