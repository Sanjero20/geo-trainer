type LocalStorageProvince = {
  name: string;
  guessed: boolean | null;
};

// Getters in local storage
function getLocalProvinces(): LocalStorageProvince[] {
  const provinces = localStorage.getItem("provinces") || "[]";
  return JSON.parse(provinces);
}

function getLocalGuessIndex() {
  const index = localStorage.getItem("current") || "0";
  return parseInt(index);
}

export function getGameData() {
  const provinces = getLocalProvinces();
  const currentGuessIndex = getLocalGuessIndex();
  const currentlyGuessing = provinces[currentGuessIndex].name;

  return {
    provinces,
    currentGuessIndex,
    currentlyGuessing,
  };
}

// Setters
