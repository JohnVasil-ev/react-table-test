import { faker } from '@faker-js/faker';

import { Column, Feed, Row, Sid } from './types';

const columnTypes = ['string', 'number'];

export function makeFeed(feed: string): Feed {
  return feed as Feed;
}

export function makeSid(sid: string): Sid {
  return sid as Sid;
}

export function generateColumn(title: string, technicalName: string): Column {
  return {
    title,
    technicalName,

    id: faker.string.nanoid(),
    type: columnTypes[faker.number.int({ min: 0, max: 1 })],

    size: 150,
    isPinned: faker.datatype.boolean({ probability: 0.5 }),
    required: faker.datatype.boolean(),
    isMoving: false,
    isSelected: false,
  };
}

export function generateRow(index: number): Row {
  return {
    id: faker.string.nanoid(),
    feed: makeFeed(`TEST_${index}`),
    sid: makeSid(`TEST_${index}`),

    isMoving: false,
    isSelected: false,
  };
}

export function generateData(): Record<string, unknown> {
  return {
    FIRST_NAME: faker.person.firstName(),
    LAST_NAME: faker.person.lastName(),
    AGE: faker.number.int({ min: 0, max: 100 }),
    COMPANY: faker.company.name(),
  };
}
