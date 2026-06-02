export interface HistoryItem {
  id: string;
  timestamp: number;
  converterType: string;
  fromUnit: string;
  toUnit: string;
  inputValue: string;
  outputValue: string;
}

const STORAGE_KEY = 'realunitconverter_history';

/**
 * Reads conversion history records from the browser's localStorage.
 */
export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading conversion history from localStorage', e);
    return [];
  }
}

/**
 * Saves the raw conversion history records array back to localStorage.
 */
export function saveHistory(items: HistoryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error writing conversion history to localStorage', e);
  }
}

/**
 * Deletes a single history record matching the provided ID.
 */
export function deleteHistoryRecord(id: string): void {
  const items = getHistory();
  const filtered = items.filter(item => item.id !== id);
  saveHistory(filtered);
}

/**
 * Clears all stored conversion history records.
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing conversion history from localStorage', e);
  }
}
