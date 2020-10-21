/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const BASE_URL = 'https://api.football-data.org/v2/'
const API_KEY = 'a15c18b60c014359b2400e020acc5e68'
const LEAGUE_ID = 2014

const ENDPOINT = `${BASE_URL}competitions/${LEAGUE_ID}/standings`
const ENDPOINT_DETAIL = `${BASE_URL}teams/`
const ENDPOINT_SCHEDULE = `${ENDPOINT_DETAIL}`
const ENDPOINT_SCHEDULED = '/matches?status=SCHEDULED'

const fetchAPI = url => {
  return fetch(url, {
    headers: { 'X-Auth-Token': API_KEY }
  })
    .then(res => {
      if (res.status !== 200) {
        console.log('Error: ' + res.status)
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

function getAllStandings () {
  if ('caches' in window) {
    caches.match(ENDPOINT).then(response => {
      if (response) {
        response.json().then(data => {
          showStanding(data)
        })
      }
    })
  }

  fetchAPI(ENDPOINT)
    .then(data => {
      showStanding(data)
    })
    .catch(error => {
      console.log(error)
    })
}

function showStanding (data) {
  const standingElement = document.getElementById('content')
  let standings = ''

  data.standings[0].table.forEach(standing => {
    standings += `
                <tr>
                    <td>
                    <a href="./detail.html?id=${standing.team.id}">
                    <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
                    </a></td>
                    <td>
                    <a style="text-decoration: none; color: inherit;" href="./detail.html?id=${standing.team.id}">
                    ${standing.team.name}
                    </a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `
  })

  standingElement.innerHTML = `
                <div class="card orange lighten-3" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="highlight responsive-table centered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                </div>
    `
}

function getDetail () {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(ENDPOINT_DETAIL + idParam).then(response => {
        if (response) {
          response.json().then(data => {
            showDetail(data)
            resolve(data)
          })
        }
      })
    }

    fetchAPI(ENDPOINT_DETAIL + idParam)
      .then(data => {
        showDetail(data)
        resolve(data)
      })
      .catch(error => {
        console.log(error)
      })
  })
}

function getNextMacth () {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(ENDPOINT_SCHEDULE + idParam + ENDPOINT_SCHEDULED).then(response => {
        if (response) {
          response.json().then(data => {
            showNextMatch(data)
            resolve(data)
          })
        }
      })
    }

    fetchAPI(ENDPOINT_SCHEDULE + idParam + ENDPOINT_SCHEDULED)
      .then(data => {
        showNextMatch(data)
        resolve(data)
      })
      .catch(error => {
        console.log(error)
      })
  })
}

function showDetail (data) {
  let details = ''
  const detailElement = document.getElementById('body-content')

  data.squad.forEach(detail => {
    details += `
                <tr>
                    <td>${detail.name}</td>
                    <td>${detail.position}</td>
                    <td>${detail.nationality}</td>
                </tr>
        `
  })

  detailElement.innerHTML = `
                <h1 class="header center black-text text-lighten-2">${data.shortName}</h1>
                <div class="center">
                <img class="responsive-img" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="badge"/>
                </div>
                <h5 class="center black-text text-lighten-2">${data.address}</h5>
                <h6 class="center black-text text-lighten-2">${data.phone}</h6>
                <h6 class="center black-text text-lighten-2">
                <a style="text-decoration: none; color: inherit;" href="${data.website}">
                ${data.website}
                </a>
                </h6>
                <div class="card orange darken-3" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="striped orange lighten-3 responsive-table centered">
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Position</th>
                            <th>Nationality</th>
                        </tr>
                     </thead>
                    <tbody id="details">
                        ${details}
                    </tbody>
                </table>
                </div>
    `
}

function showNextMatch (data) {
  let nextMatch = ''
  const netxMatchElement = document.getElementById('body-next-match')

  data.matches.forEach(match => {
    nextMatch += `
                <tr>
                    <td>${match.competition.name}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.awayTeam.name}</td>
                    <td>${new Date(match.utcDate).toString()}</td>
                </tr>
        `
  })

  netxMatchElement.innerHTML = `
                <h1 class="header center black-text text-lighten-2">Next Match</h1>
                <div class="card orange darken-3" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="striped orange lighten-3 responsive-table centered">
                    <thead>
                        <tr>
                            <th>Competition</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Date</th>
                        </tr>
                     </thead>
                    <tbody id="details">
                        ${nextMatch}
                    </tbody>
                </table>
                </div>
    `
}

function getSavedDetailById () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id').toString()

  getDetailById(idParam).then(data => {
    showDetail(data)
  })
  getNetxMatchById(idParam).then(data => {
    showNextMatch(data)
  })
}

function getSavedContent () {
  getAll().then(data => {
    let allSaved = ''
    const detailElement = document.getElementById('favorite-content')
    data.forEach(favorites => {
      allSaved += `
                <div class="col s12 m6">
                  <div class="card" style="padding: 12px; margin-top: 12px;">
                    <div class="card-image waves-effect waves-block waves-light">
                        <a href="./detail.html?id=${favorites.id}&saved=true">
                          <img class="activator responsive-img" src="${favorites.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="badge">
                        </a>
                    </div>
                      <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${favorites.shortName}<i class="material-icons right">more_vert</i></span>
                      </div>
                    <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4">${favorites.name}<i class="material-icons right">close</i></span>
                      <ul class="collection">
                        <li class="collection-item">Address : ${favorites.address}</li>
                        <li class="collection-item">Phone : ${favorites.phone}</li>
                        <li class="collection-item">Website : ${favorites.website}
                        <a style="text-decoration: none; color: inherit;" href="${favorites.website}"/>
                        </li>
                        <li class="collection-item">Email : ${favorites.email}</li>
                        <li class="collection-item">Venue : ${favorites.venue}</li>
                        <li class="collection-item">Founded : ${favorites.founded}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                `
      detailElement.innerHTML = `
                         ${allSaved}
                `
    })
  })
}
