export type Nominal<T, Name extends string> = T & {
  readonly [Symbol.species]: Name;
};

export type Feed = Nominal<string, 'Feed'>;
export type Sid = Nominal<string, 'Sid'>;

export interface SharedType {
  id: string;
  isMoving: boolean; // false
  isSelected: boolean; // false
}

export interface Column extends SharedType {
  title: string;
  type: string;
  technicalName: string;
  size: number;
  isPinned: boolean; // false
  required: boolean; // false
}
export type Columns = Array<Column>;

export interface Row extends SharedType {
  feed: Feed;
  sid: Sid;
}
export type Rows = Array<Row>;

export interface ApiData {
  feed: Feed;
  sid: Sid;
  fields: Record<string, unknown>;
}
export type Data = Record<Sid, Record<string, unknown>>;

export type StoreType = {
  columns: Columns;
  rows: Rows;
  data: Data;
  hovers: Array<boolean>;
};
