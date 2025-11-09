import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    console.log(`[Storage] Saving data for key: ${key}`);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`[Storage] Data saved for key: ${key}`);
  } catch (error) {
    console.error(`[Storage] Failed to save data for key: ${key}`, error);
    throw error;
  }
};

export const getData = async (key) => {
  try {
    console.log(`[Storage] Retrieving data for key: ${key}`);
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      const parsedValue = JSON.parse(jsonValue);
      console.log(`[Storage] Data retrieved for key: ${key}`);
      return parsedValue;
    }
    console.log(`[Storage] No data found for key: ${key}`);
    return null;
  } catch (error) {
    console.error(`[Storage] Failed to retrieve data for key: ${key}`, error);
    throw error;
  }
};

export const removeData = async (key) => {
  try {
    console.log(`[Storage] Removing data for key: ${key}`);
    await AsyncStorage.removeItem(key);
    console.log(`[Storage] Data removed for key: ${key}`);
  } catch (error) {
    console.error(`[Storage] Failed to remove data for key: ${key}`, error);
    throw error;
  }
};

export const clearAll = async () => {
  try {
    console.log('[Storage] Clearing all data');
    await AsyncStorage.clear();
    console.log('[Storage] All data cleared');
  } catch (error) {
    console.error('[Storage] Failed to clear storage', error);
    throw error;
  }
};

