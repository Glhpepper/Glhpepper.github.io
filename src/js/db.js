/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const dbPromised = idb.open('favorite_database', 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains('favorites_detail') && !upgradedDb.objectStoreNames.contains('next_match')) {
    upgradedDb.createObjectStore('favorites_detail', { keyPath: 'id' })
    upgradedDb.createObjectStore('next_match')
  }
})

const insertDetail = data => {
  dbPromised.then(db => {
    const transaction = db.transaction('favorites_detail', 'readwrite')
    transaction.objectStore('favorites_detail').add(data)
    return transaction.complete
  }).then(() => {
    console.log('detail berhasil di simpan.')
  })
}

const insertNextMatch = (data, idParam) => {
  dbPromised.then(db => {
    const transaction = db.transaction('next_match', 'readwrite')
    transaction.objectStore('next_match').add(data, idParam)
    return transaction.complete
  }).then(() => {
    console.log('nextmatch berhasil di simpan.')
  })
}

const getAll = () => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const transaction = db.transaction('favorites_detail', 'readonly')
        return transaction.objectStore('favorites_detail').getAll()
      })
      .then(data => {
        resolve(data)
      })
  })
}

const getDetailById = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const transaction = db.transaction('favorites_detail', 'readonly')
        return transaction.objectStore('favorites_detail').get(parseInt(id))
      })
      .then(data => {
        resolve(data)
      })
  })
}

const getNetxMatchById = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const transaction = db.transaction('next_match', 'readonly')
        return transaction.objectStore('next_match').get(id)
      })
      .then(data => {
        resolve(data)
      })
  })
}

const DeleteDetailById = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const transaction = db.transaction('favorites_detail', 'readwrite')
        return transaction.objectStore('favorites_detail').delete(parseInt(id))
      })
      .then(data => {
        resolve(data)
      })
  })
}

const DeleteNextMatchById = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const transaction = db.transaction('next_match', 'readwrite')
        return transaction.objectStore('next_match').delete(id)
      })
      .then(data => {
        resolve(data)
      })
  })
}
