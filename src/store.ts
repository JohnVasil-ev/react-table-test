import { deepMap, DeepMapStore, map, MapStore } from 'nanostores';
import { useStore as useBaseStore, UseStoreOptions } from '@nanostores/react';

import type { Column, StoreType } from './types';
import { generateColumn, generateData, generateRow, makeSid } from './utils';

const numberOfRows = 20;

const defaultState: StoreType = {
  columns: [
    generateColumn('Имя', 'FIRST_NAME'),
    generateColumn('Фамилия', 'LAST_NAME'),
    generateColumn('Возраст', 'AGE'),
    generateColumn('Компания', 'COMPANY'),
  ],
  hovers: Array.from<boolean>({ length: numberOfRows }).fill(false),
  rows: Array.from({ length: numberOfRows }).map((_, i) => generateRow(i)),
  data: Array.from({ length: numberOfRows }).reduce(
    (acc: StoreType['data'], _, index) => {
      acc[makeSid(`TEST_${index}`)] = generateData();
      return acc;
    },
    {},
  ),
};

export const $store = deepMap<StoreType>(defaultState);

export const useStore = (
  keys?: UseStoreOptions<DeepMapStore<StoreType>>['keys'],
) => useBaseStore($store, keys && { keys });

export type MovingStoreType = {
  isActive: boolean;
  x: number | null;
  y: number | null;
  column: Column | null;
};

const defaultMovingState: MovingStoreType = {
  isActive: false,
  x: null,
  y: null,
  column: null,
};

export const $movingColumnStore = map<MovingStoreType>(defaultMovingState);

export const useMovingStore = (
  keys?: UseStoreOptions<MapStore<MovingStoreType>>['keys'],
) => useBaseStore($movingColumnStore, keys && { keys });

export type ResizeStoreType = {
  isActive: boolean;
  x: number | null;
  y: number | null;
  column: Column | null;
};

const defaultResizeState: ResizeStoreType = {
  isActive: false,
  x: null,
  y: null,
  column: null,
};

export const $resizeColumnStore = map<ResizeStoreType>(defaultResizeState);

export const useResizeStore = (
  keys?: UseStoreOptions<MapStore<ResizeStoreType>>['keys'],
) => useBaseStore($resizeColumnStore, keys && { keys });
