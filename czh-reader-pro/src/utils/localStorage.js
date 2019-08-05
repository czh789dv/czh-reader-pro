import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(k) {
  return localStorage.delete(k)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function setBookObject(fileName, key, value) {
  //获取本地的存储
  let book = getLocalStorage(`${fileName}-info`)
  //如果没有 创建一个对象
  if (!book) {
    book = {}
  }
  //将value的值给Book
  book[key] = value
  //存储BOOK到fileName-info这个本地存储里
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
  //获取本地的存储
  let book = getLocalStorage(`${fileName}-info`)
  //如果有 返回数值
  if (book) {
    return book[key]
  } else {
    return null
  }
}

export function getFontFamily(fileName) {
  //获取本地存储里的fontFamily
  return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily(fileName, font) {
  //设置本地存储里的fontFamily 将font存入
  return setBookObject(fileName, 'fontFamily', font)
}
