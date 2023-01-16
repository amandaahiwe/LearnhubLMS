//store data in local storage
export const storeData = (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    return localStorage.setItem(`@learnhub_${key}`, jsonValue);
  } catch (e) {
    // saving error
    return { error: true, message: e };
  }
};
//get data in local storage
export const getData = (key) => {
  try {
    const jsonValue = localStorage.getItem(`@learnhub_${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return { error: true, message: e };
  }
};

//clear a specific key/field
export const clearData = (key) => {
  localStorage.removeItem(`@learnhub_${key}`);
};
