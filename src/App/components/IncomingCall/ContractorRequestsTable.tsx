import React, { useEffect, useState } from "react";
import {
  ListColumnData,
  ItemData,
} from "../../../UIKit/CustomList/CustomListTypes";
import CustomList from "../../../UIKit/CustomList/CustomList";
import Scripts from "../../shared/utils/clientScripts";
import utils, { redirectSPA } from "../../shared/utils/utils";
import Button from "../../../UIKit/Button/Button";

/** Панель Обращения */
function ContractorRequestsTable({
  contractorId,
  phone,
  onRequestSelect,
}: {
  contractorId: string;
  phone: string;
  onRequestSelect: (id: string) => void;
}) {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Номер",
      code: "num",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "createdAt",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Канал",
      code: "channel",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Обратившийся",
      code: "contractor",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тема обращения",
      code: "appealTheme",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "status",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Причина обращения",
      code: "reason",
      fr: 1,
      isSortable: true,
    }),
  ];

  const bind = async () => {
    if (!selectedRequestId) return;
    await Scripts.createInteractionByRequestId(
      selectedRequestId,
      contractorId,
      phone
    );
    localStorage.removeItem("medpult-draft");
    redirectSPA("<%=Context.data.request_page_path%>");
  };

  const search = () => {
    localStorage.setItem("medpult-call-phone", phone);
    localStorage.setItem("medpult-call-contractor", contractorId);
    // Перейти на форму отбора контрагентов
    const link = Scripts.getRequestPagePath();
    redirectSPA(link);
  };

  const newRequest = async () => {
    window.localStorage.removeItem("medpult-draft");

    const request_page_path = Scripts.getRequestPagePath();
    redirectSPA(request_page_path + "?mode=create");
  };

  const handleRequestSelect = (ids: string[]) => {
    const id = ids.length > 0 ? ids[0] : null;
    setSelectedRequestId(id);
    onRequestSelect(id ?? "");
  };

  return (
    <div>
      <div className="medpult-top-panel">
        <span>Обращения обратившегося по звонку</span>
        <div style={{ display: "flex", gap: "20px" }}>
          {selectedRequestId && (
            <Button title="Привязать" clickHandler={bind} />
          )}
          <Button
            title="Поиск"
            clickHandler={search}
            style={{ backgroundColor: "53B5DF" }}
            //disabled={contractorId === ''}
          />
          <Button
            title="Новое обращение"
            clickHandler={newRequest}
            buttonType="action"
          />
        </div>
      </div>
      <CustomList
        columnsSettings={columns}
        getDataHandler={() => Scripts.getRequestsByContractor(contractorId)}
        isScrollable={false}
        isSelectable={true}
        isMultipleSelect={false}
        selectedItems={selectedRequestId ? [selectedRequestId] : []}
        setSelectedItems={handleRequestSelect}
      />
    </div>
  );
}

export default ContractorRequestsTable;
