/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const isFromSaved = urlParams.get('saved')
  const idParam = urlParams.get('id')
  const backButton = document.getElementById('back-button')
  const save = document.getElementById('favorite')
  const deleteButton = document.getElementById('delete')

  if (isFromSaved) {
    save.style.display = 'none'
    getSavedDetailById()
    backButton.href = './index.html#favorite'
  } else {
    backButton.href = './index.html'
    deleteButton.style.display = 'none'
    var detail = getDetail()
    var nextMatch = getNextMacth()
  }

  save.onclick = () => {
    M.toast({ html: 'Added to Favorite', classes: 'rounded' })
    detail.then(data => {
      insertDetail(data)
    })
    nextMatch.then(data => {
      insertNextMatch(data, idParam)
    })
  }

  deleteButton.onclick = () => {
    M.toast({ html: 'Deleted from Favorite', classes: 'rounded' })
    DeleteDetailById(parseInt(idParam))
    DeleteNextMatchById(idParam)
  }
})
