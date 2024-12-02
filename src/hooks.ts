import { useStore } from './store';
import { Sid } from './types';

function guard(value: unknown): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

function formatValue<T>(value: T): string | number {
  if (guard(value)) return value;
  return String(value);
}

export function useTableValue(
  sid: Sid,
  fieldName: string,
): string | number | null {
  const { data } = useStore([`data.${sid}.${fieldName}`]);
  const value = data?.[sid]?.[fieldName];
  return value ? formatValue(value) : null;
}
