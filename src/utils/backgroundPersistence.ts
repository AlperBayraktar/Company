const STORAGE_KEY = 'backgroundSettings';

export function loadBackgroundSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load background settings', e);
  }
  return null;
}

export function saveBackgroundSettings(settings: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save background settings', e);
  }
}
