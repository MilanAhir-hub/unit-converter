export interface FavoriteItem {
  id: string;
  timestamp: number;
  converterType: string;
  inputValue: string;
  fromUnit: string;
  outputValue: string;
  toUnit: string;
}

const STORAGE_KEY = 'realunitconverter_favorites';

/**
 * Reads all stored favorite measurements from browser's localStorage.
 */
export function getFavorites(): FavoriteItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading favorites from localStorage', e);
    return [];
  }
}

/**
 * Saves raw favorites list back to localStorage.
 */
export function saveFavorites(items: FavoriteItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error writing favorites to localStorage', e);
  }
}

/**
 * Checks if a specific conversion measurement has already been saved to favorites.
 */
export function isFavorite(
  converterType: string,
  inputValue: string,
  fromUnit: string,
  outputValue: string,
  toUnit: string
): boolean {
  const items = getFavorites();
  return items.some(item => 
    item.converterType.toLowerCase() === converterType.toLowerCase() &&
    item.inputValue.trim() === inputValue.trim() &&
    item.fromUnit.toLowerCase() === fromUnit.toLowerCase() &&
    item.outputValue.trim() === outputValue.trim() &&
    item.toUnit.toLowerCase() === toUnit.toLowerCase()
  );
}

/**
 * Toggles a conversion favorite. 
 * If it already exists, it is removed. If not, it is added.
 * Returns true if the item was added, false if it was removed.
 */
export function toggleFavorite(item: Omit<FavoriteItem, 'id' | 'timestamp'>): boolean {
  const items = getFavorites();
  
  const existingIndex = items.findIndex(fav => 
    fav.converterType.toLowerCase() === item.converterType.toLowerCase() &&
    fav.inputValue.trim() === item.inputValue.trim() &&
    fav.fromUnit.toLowerCase() === item.fromUnit.toLowerCase() &&
    fav.outputValue.trim() === item.outputValue.trim() &&
    fav.toUnit.toLowerCase() === item.toUnit.toLowerCase()
  );

  if (existingIndex !== -1) {
    // Remove it
    items.splice(existingIndex, 1);
    saveFavorites(items);
    return false;
  } else {
    // Add it
    const newItem: FavoriteItem = {
      ...item,
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };
    items.unshift(newItem); // Prepend so new favorites show first
    saveFavorites(items);
    return true;
  }
}

/**
 * Removes a favorite item by its unique ID.
 */
export function deleteFavorite(id: string): void {
  const items = getFavorites();
  const filtered = items.filter(item => item.id !== id);
  saveFavorites(filtered);
}

/**
 * Clears all favorite measurements.
 */
export function clearFavorites(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing favorites from localStorage', e);
  }
}
