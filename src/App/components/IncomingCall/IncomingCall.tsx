import React, { FormEvent, useEffect, useState } from "react";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import Button from "../../../UIKit/Button/Button";
import InputButton from "../../../UIKit/InputButton/InputButton";
import ModalWrapper from "../../../UIKit/ModalWrapper/ModalWrapper";
import icons from "../../shared/icons";
import Scripts from "../../shared/utils/clientScripts";
import { getMaskedPhone } from "../../shared/utils/utils";
import ModalIncomingCall from "./ModalIncomingCall/ModalIncomingCall";
import ContractorsTable from "./ContractorsTable";
import ContractorRequestsTable from "./ContractorRequestsTable";
import utils, { redirectSPA } from "../../shared/utils/utils";

export const IncomingCall = () => {
  const [phone, setPhone] = useState("");
  const [contractorId, setContractorId] = useState("");
  const [requestId, setRequestId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const answerCall = async () => {
    if (phone === "") {
      setError("Укажите номер телефона");
      return;
    }
    setModalOpen(true);
  };

  useEffect(() => {
    const localPhone = localStorage.getItem("medpult-call-phone");
    // Если телефон указан - открыть форму звонка
    if (localPhone) {
      setPhone(localPhone);
      localStorage.removeItem("medpult-call-phone");
      answerCall();
    }
  }, []);

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    if (error !== "") {
      setError("");
    }
    const maskedPhone = getMaskedPhone(e.currentTarget.value);
    setPhone(maskedPhone);
  };

  const onModalClose = () => {
    setModalOpen(false);
    setContractorId("");
  };

  const createAppeal = async () => {
    window.localStorage.removeItem("medpult-draft");

    const request_page_path = Scripts.getRequestPagePath();
    redirectSPA(request_page_path + "?mode=create");
  };

  // Обработчик выбора контрагента
  const handleContractorSelect = (id: string) => {
    setContractorId(id);
  };

  return (
    <div className="medpult-incoming-call">
      <div className="medpult-incoming-call__input">
        <CustomInput
          value={phone}
          setValue={setPhone}
          onInput={onInput}
          type="tel"
          placeholder="+7 000 000 00 00"
          buttons={[<InputButton svg={icons.Call} clickHandler={""} />]}
        />
      </div>
      <Button title="Принять вызов" clickHandler={answerCall} />
      {error !== "" && (
        <span className="medpult-incoming-call__error">{error}</span>
      )}
      <div className="medpult-incoming-call__create-appeal">
        <Button
          title="Создать обращение"
          clickHandler={createAppeal}
          buttonType="outline"
        />
      </div>
      {modalOpen && (
        <ModalWrapper>
          <ModalIncomingCall
            title={`Прием входящего звонка от ${phone}`}
            isOpen={modalOpen}
            onClose={onModalClose}
          >
            <ContractorsTable
              phone={phone}
              onContractorSelect={handleContractorSelect}
            />
            {contractorId !== "" && (
              <ContractorRequestsTable
                contractorId={contractorId}
                phone={phone}
                onRequestSelect={(id) => setRequestId(id)}
              />
            )}
          </ModalIncomingCall>
        </ModalWrapper>
      )}
    </div>
  );
};
