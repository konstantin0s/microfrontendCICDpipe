import { MFE_UI_NAMESPACE } from '../variables';

export const getPersistedData = (id: string) => {
  const existing = localStorage.getItem(`${MFE_UI_NAMESPACE}-${id}`);

  if (existing) {
    return JSON.parse(existing);
  }

  return {};
};

export const setPersistedValue = (
  id: string,
  key: string,
  value: string | boolean,
): void => {
  const existing = localStorage.getItem(`${MFE_UI_NAMESPACE}-${id}`);
  const update = existing ? JSON.parse(existing) : {};
  const newValue = {
    ...update,
    [key]: value,
  };

  localStorage.setItem(`${MFE_UI_NAMESPACE}-${id}`, JSON.stringify(newValue));
};
