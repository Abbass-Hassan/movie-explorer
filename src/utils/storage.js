import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    throw error;
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      const parsedValue = JSON.parse(jsonValue);
      return parsedValue;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    throw error;
  }
};

