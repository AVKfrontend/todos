const storageKey = 'todoList'


function saveInStorage(todoList) {
  sessionStorage.setItem(storageKey, JSON.stringify(todoList))
}

function restoreFromStorage() {
  const preSaved = sessionStorage.getItem(storageKey)
  if (preSaved) {
    const savedTodoList = JSON.parse(preSaved)
    const idCount = Math.max(...savedTodoList.map(el => el = el.id))
    return {savedTodoList, idCount}
  } else return {savedTodoList:null, idCount:null}
}

export {saveInStorage, restoreFromStorage}
