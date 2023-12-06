export function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

export const getDefaultLanguage = () => {
  const languageFromStorage = localStorage.getItem(DEFAULT_LANGUAGE_KEY);
  if (languageFromStorage) {
    return LANGUAGES.find(l => l.key === languageFromStorage);
  }
  return LANGUAGES.find(l => l.default);
};

export const setDefaultLanguage = (key) => {
  return localStorage.setItem(DEFAULT_LANGUAGE_KEY, key);
};

export const getObjectValue = (jsonData, topLevelKey, nestedKey) => {
  if (jsonData.hasOwnProperty(topLevelKey) && jsonData[topLevelKey].hasOwnProperty(nestedKey)) {
    return jsonData[topLevelKey][nestedKey];
  } 
  else {
    return false;
  }
}