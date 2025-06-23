import { ObjectItem } from "../../UIKit/Filters/FiltersTypes";

export class RequestsListData {
  /** Номер обращения */
  appealNumber?: ObjectItem;
  /** SLA обращения */
  sla?: ObjectItem;
  /** Канал обращения*/
  appealChannel?: string;
  /** Статус контрагента*/
  statusContragent?: ObjectItem;
  /** Email обращения*/
  appealEmail?: string;
  /** Тема обращения*/
  appealTheme?: string;
  /** Дата создания обращения*/
  appealCreatedAt?: string;
  /** Обратившийся*/
  objContragent?: string;
  /** Статус обращения*/
  appealStatus?: ObjectItem;
  /** Дата последнего взаимодействия*/
  dateInteraction?: string;
  /** Полис*/
  policy?: ObjectItem;
  /** Причина обращения*/
  appealReason?: string;

  constructor({
    appealNumber,
    sla,
    appealChannel,
    statusContragent,
    appealEmail,
    appealTheme,
    appealCreatedAt,
    objContragent,
    appealStatus,
    dateInteraction,
    policy,
    appealReason,
  }: RequestsListData) {
    this.appealNumber = appealNumber;
    this.sla = sla;
    this.appealChannel = appealChannel;
    this.statusContragent = statusContragent;
    this.appealEmail = appealEmail;
    this.appealTheme = appealTheme;
    this.appealCreatedAt = appealCreatedAt;
    this.objContragent = objContragent;
    this.appealStatus = appealStatus;
    this.dateInteraction = dateInteraction;
    this.policy = policy;
    this.appealReason = appealReason;
  }
}

export class TaskListData {
  /** Номер задачи */
  taskNumber?: ObjectItem;
  /** SLA задачи */
  sla?: ObjectItem;
  /** Срочность*/
  urgency?: string;
  /** Статус контрагента*/
  statusContragent?: ObjectItem;
  /**Застрахованный*/
  insured?: string;
  /** Регион*/
  region?: string;
  /** Дата создания */
  createdAt?: string;
  /** Дата контроля*/
  controlDate?: string;
  /** Тип задачи*/
  type?: string;
  /** Вид задачи*/
  sort?: string;
  /** Статус задачи*/
  status?: ObjectItem;
  /** Полис*/
  policy?: ObjectItem;
  /** Исполнитель*/
  executor?: string;

  constructor({
    taskNumber,
    sla,
    urgency,
    statusContragent,
    insured,
    region,
    createdAt,
    controlDate,
    type,
    sort,
    status,
    policy,
    executor,
  }: TaskListData) {
    this.taskNumber = taskNumber;
    this.sla = sla;
    this.urgency = urgency;
    this.statusContragent = statusContragent;
    this.insured = insured;
    this.region = region;
    this.createdAt = createdAt;
    this.controlDate = controlDate;
    this.type = type;
    this.sort = sort;
    this.status = status;
    this.policy = policy;
    this.executor = executor;
  }
}

export class ContragentListData {
  fullname: ObjectItem;
  phone: string;
  email: string;
  type: string;
  birthdate: string;

  constructor({ fullname, phone, email, type, birthdate }: ContragentListData) {
    this.fullname = fullname;
    this.phone = phone;
    this.email = email;
    this.type = type;
    this.birthdate = birthdate;
  }
}

export class ContractorRequestsListData {
  id: string;
  num: string;
  createdAt: string;
  channel: string;
  contractor: string;
  appealTheme: string;
  status?: string;
  reason?: string;
  constructor({
    num,
    createdAt,
    channel,
    contractor,
    appealTheme,
    status,
    reason,
  }: ContractorRequestsListData) {
    this.num = num;
    this.createdAt = createdAt;
    this.channel = channel;
    this.contractor = contractor;
    this.appealTheme = appealTheme;
    this.status = status;
    this.reason = reason;
  }
}

/** Буфер значения срока */
export type TermBuffer = {
  /** Идентификатор объекта */
  id: string,
  /** Оставшееся количество минут */
  minutesRemaining: number,
  /** Идентификатор SLA */
  slaId?: string,
  /** Значение SLA в минутах */
  slaValue?: number,
  /** Дата от которой отсчитывается дедлайн */
  startDate?: Date
  /** Дата от которой вычисляется оставшееся время */
  endDate?: Date
}