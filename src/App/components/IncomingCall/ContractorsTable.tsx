import React, { useEffect, useState } from "react";
import {
  ListColumnData,
  ItemData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import CustomList from "../../../UIKit/CustomList/CustomList";
import Scripts from "../../shared/utils/clientScripts";
import utils, { redirectSPA } from "../../shared/utils/utils";
import Button from "../../../UIKit/Button/Button";
import { FetchData } from "../../../UIKit/CustomList/CustomListTypes";

/** Панель Обращения */
function ContractorsTable({
  phone,
  onContractorSelect,
}: {
  phone: string;
  onContractorSelect: (id: string) => void;
}) {
  const [selectedContractor, setSelectedContractor] = useState<string | null>(
    null
  );

  /** Обработчик выбора строки в таблице */
  const handleSelectContractor = (ids: string[]) => {
    if (ids.length === 0) {
      setSelectedContractor(null);
      onContractorSelect("");
      return;
    }
    const contractorId = ids[0];
    setSelectedContractor(contractorId);
    onContractorSelect(contractorId);
  };
  /** Обработчик нажатия на контрагента */
  const onClickContractor = async (props: ItemData) => {
    const contractorId = props.info;
    if (!contractorId) return;

    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );
    localStorage.setItem("medpultContractorId", contractorId);
    //localStorage.setItem(localStorageDraftKey, JSON.stringify(data));

    // Переход
    const link = Scripts.getContractorPageCode();
    redirectSPA(link);
  };

  const search = () => {
    localStorage.setItem("medpult-call-phone", phone);
    // Перейти на форму отбора контрагентов
    redirectSPA(
      "<%=Context.data.select_contractors_path%>?field_id=medpult-worktable-call&&phone=" +
        encodeURI(phone)
    );
  };
  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Полное наименование",
      code: "fullname",
      fr: 1,
      isLink: true,
      isSortable: true,
      onClick: onClickContractor,
    }),
    new ListColumnData({
      name: "Телефон",
      code: "phone",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Email",
      code: "email",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тип",
      code: "type",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Дата рождения",
      code: "birthdate",
      fr: 1,
      isSortable: true,
    }),
  ];

  return (
    <div>
      <div className="medpult-top-panel">
        <span>Выбор контрагента обратившегося</span>
        <Button
          title="Поиск"
          clickHandler={search}
          style={{ backgroundColor: "#53B5DF" }}
        />
      </div>
      <CustomList
        columnsSettings={columns}
        getDataHandler={() => Scripts.getContractorsList(phone)}
        isScrollable={false}
        isSelectable={true}
        isMultipleSelect={false}
        selectedItems={selectedContractor ? [selectedContractor] : []}
        setSelectedItems={handleSelectContractor}
      />
    </div>
  );
}

export default ContractorsTable;
