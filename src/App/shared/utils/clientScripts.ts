import { FetchData, SortData } from "../../../UIKit/CustomList/CustomListTypes";
import {
  RequestsListData,
  TaskListData,
  ContragentListData,
  ContractorRequestsListData,
  TermBuffer,
} from "../types";
import { generateTermBufferList } from "./termBufferMockGenerator";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получение списка обращений */
async function getRequests(
  page: number,
  sortData?: SortData
): Promise<FetchData<RequestsListData>> {
  await randomDelay();

  const mockData: RequestsListData = {
    appealNumber: { value: "RQ000006100/25", info: "11113" },
    sla: { value: "- 3д 2ч 20м", info: 90 },
    appealChannel: "103@sberins.ru",
    statusContragent: { value: "Gold", info: "Gold" },
    appealEmail: "ivanov@mail.ru",
    appealTheme: "Тестирование",
    appealCreatedAt: "07.02.2025 12:17",
    objContragent: "Назаров Антон Алексеевич",
    appealStatus: { value: "Возвращена", info: "returned" },
    dateInteraction: "07.02.2025 12:17",
    policy: { value: "008WS000000000/1", info: "11113" },
    appealReason: "Согласовать ОАМ",
  };

  return {
    items: Array(15)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new RequestsListData(mockData),
        };
      }),
    hasMore: true,
  };
}
/** Получить количество обращений*/
async function getCountRequests() {
  return 4;
}

async function getSlaRequests() {
  await randomDelay();
  return Math.floor(Math.random() * 100);
}

/** Получение списка моих задач */
async function getMyTask(
  page: number,
  sortData?: SortData
): Promise<FetchData<TaskListData>> {
  await randomDelay();

  const mockData: TaskListData = {
    taskNumber: { value: "RQ000006100/25", info: "11113" },
    sla: { value: "- 3д 2ч 20м", info: 30 },
    urgency: "Экстренно",
    statusContragent: { value: "Silver", info: "Silver" },
    insured: "Назаров Антон Алексеевич",
    region: "Москва",
    createdAt: "07.02.2025 12:17",
    controlDate: "07.02.2025 12:17",
    type: "Медицинское",
    sort: "Согласование услуг",
    status: { value: "В работе", info: "atWork" },
    policy: { value: "008WS000000000/1", info: "111" },
    executor: "Назаров Антон Алексеевич",
  };

  return {
    items: Array(15)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new TaskListData(mockData),
        };
      }),
    hasMore: true,
  };
}
/** Получить количество обращений*/
async function getCountMyTask() {
  return 4;
}

async function getSlaMyTask() {
  await randomDelay();
  return Math.floor(Math.random() * 100);
}

/** Получение списка задач моей группы */
async function getTasksGroup(
  page: number,
  sortData?: SortData
): Promise<FetchData<TaskListData>> {
  await randomDelay();

  const mockData: TaskListData = {
    taskNumber: { value: "RQ000006100/25", info: "11113" },
    sla: { value: "- 3д 2ч 20м", info: 0 },
    urgency: "Планово",
    statusContragent: { value: "Platinum", info: "Platinum" },
    insured: "Назаров Антон Алексеевич",
    region: "Москва",
    createdAt: "07.02.2025 12:17",
    controlDate: "07.02.2025 12:17",
    type: "Медицинское",
    sort: "Согласование услуг",
    status: { value: "В очереди", info: "queue" },
    policy: { value: "008WS000000000/1", info: "queue" },
    executor: "Назаров Антон Алексеевич",
  };

  return {
    items: Array(15)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new TaskListData(mockData),
        };
      }),
    hasMore: true,
  };
}
/** Получить количество задач группы*/
async function getCountTasksGroup() {
  return 4;
}

async function getSlaTasksGroup() {
  await randomDelay();
  return Math.floor(Math.random() * 100);
}

/** Получение списка контрагентов */
async function getContractorsList(
  phone: string,
  sortData?: SortData
): Promise<FetchData<ContragentListData>> {
  await randomDelay();

  const mockData: ContragentListData = {
    fullname: { value: "Назаров Антон Алексеевич", info: "queue" },
    phone: "+79022857817",
    email: "test@gmail.com",
    type: "Физлицо",
    birthdate: "07.02.2025",
  };

  return {
    items: Array(5)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new ContragentListData(mockData),
        };
      }),
    hasMore: false,
  };
}

/** Получение списка обращений контрагента */
async function getRequestsByContractor(
  contractorId: string,
  sortData?: SortData
): Promise<FetchData<ContractorRequestsListData>> {
  await randomDelay();

  const mockData: ContractorRequestsListData = {
    id: "",
    num: "RQ00000100/25",
    createdAt: "07.02.2025 12:17",
    channel: "Телефон",
    contractor: "Назаров Антон Алексеевич",
    appealTheme: "тест",
    status: "Новое",
    reason: "есть",
  };

  return {
    items: Array(5)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new ContractorRequestsListData(mockData),
        };
      }),
    hasMore: false,
  };
}

declare const Context: any;

/** Получение кода страницы Обращение */
function getRequestPagePath(): string {
  return Context.data.request_page_path;
}

async function getRequestIdByTaskId(taskId: string): Promise<string> {
  return "test";
}
/** Получение кода страницы Задачи */
function getTaskPageCode(): string {
  return "test";
}
/** Получение кода страницы Контрагента */
function getContractorPageCode(): string {
  return Context.data.contractor_page_path;
}

/** Получение кода страницы отбора обращений */
function getSelectRequestPagePath(): string {
  return "test";
}

async function createInteractionByRequestId(
  requestId: string,
  contractorId: string,
  phone: string
): Promise<void> {}

async function OnInit(): Promise<void> {
  await randomDelay();
}

/** Получить сроки обработки обращений */
async function getRequestsProcessingTerms(requestsIds: string[]): Promise<TermBuffer[]> {
  await randomDelay();
  return generateTermBufferList()
}

/** Получить сроки решения задач */
async function getTasksResolutionTerms(tasksIds: string[]): Promise<TermBuffer[]> {
  await randomDelay();
  return generateTermBufferList()
}

export default {
  getRequests,
  getCountRequests,
  getSlaRequests,

  getMyTask,
  getCountMyTask,
  getSlaMyTask,

  getTasksGroup,
  getCountTasksGroup,
  getSlaTasksGroup,

  getContractorsList,
  getRequestsByContractor,

  getRequestPagePath,
  getTaskPageCode,
  getRequestIdByTaskId,
  getContractorPageCode,
  getSelectRequestPagePath,

  OnInit,
  createInteractionByRequestId,

  getRequestsProcessingTerms,
  getTasksResolutionTerms
};
