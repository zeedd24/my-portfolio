const STORAGE_KEY = "portfolio_data"

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const getData = () => {
  const data = localStorage.getItem(STORAGE_KEY)

  if (data) {
    return JSON.parse(data)
  }

  return null
}