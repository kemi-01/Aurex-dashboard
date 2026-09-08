const isBrowser = typeof window !== "undefined";

export const getStorage = (key, defaultValue = null) => {
  if (!isBrowser) {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);

    if (item === null) {
      return defaultValue;
    }

    return JSON.parse(item);
  } catch (error) {
    console.error(`Failed to read "${key}" from localStorage:`, error);

    return defaultValue;
  }
};

export const setStorage = (key, value) => {
  if (!isBrowser) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save "${key}" to localStorage:`, error);
  }
};

export const removeStorage = (key) => {
  if (!isBrowser) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove "${key}" from localStorage:`, error);
  }
};

export const clearStorage = () => {
  if (!isBrowser) {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
};

export const hasStorage = (key) => {
  if (!isBrowser) {
    return false;
  }

  return localStorage.getItem(key) !== null;
};