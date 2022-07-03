const $asteroids = document.querySelector('#asteroids')
const $ship = document.querySelector('#ship')
const $beams = document.querySelector('#beams')
const $container = document.querySelector('#container')
const $list = document.querySelector('#list')
const $menu = document.querySelector('#menu')
const $text = document.querySelector('#text')
const $arrow = document.querySelector('#arrow')
const $endGame = document.querySelector('#endgame')
const $results = document.querySelector('#results')
const $refresh = document.querySelector('#refresh')
const $earth = document.querySelector('#earth')
const $cloud = document.querySelector('#cloud') 
let $population = document.querySelector('#population')
let $score = document.querySelector('#score')
let $setLvl
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

let sx = 525
let time = 0.1
let lvl = 1
let counter = 0
let counterToEnd = 8
let checkAsteroids
let end = false
$ship.style = `--sx:${sx}px`

function createAsteroid() {
  let y = -100
  let x = getRandom(0, 11) * 150

  let asteroid = document.createElement('div')
  asteroid.classList.add('asteroid')
  asteroid.style.top = `${y}px`
  asteroid.style.left = `${x + 95}px`
  asteroid.innerHTML = '<img src="img/asteroid.png" alt="asteroid">'
  $asteroids.insertAdjacentElement('beforeend', asteroid)
  const $allAsteroids = document.querySelectorAll('.asteroid')
  checkAsteroids = $allAsteroids

  const int = setInterval(() => {
    y += 10
    asteroid.style.top = `${y}px`
  }, 1000 * time)


  //// Старая версия удаления взрывов, вдруг пригодится
  // setTimeout(() => {
  //   clearInterval(int)
  //   if (asteroid.innerHTML === '<img src="img/asteroid.png" alt="asteroid">') {
  //     asteroid.classList.add('nuclear-explo')
  //     asteroid.innerHTML = '<img src="img/explo2.png" alt="nuclear explo">'
  //     asteroid.style.filter = 'opacity(0)'
  //     // counterToEnd--
  //     if (counterToEnd > 0) {
  //       $population.textContent = `Earth population: ${counterToEnd} 000 000 000`
  //     } else {
  //       $population.textContent = `Earth population: all died`
  //     }
  //     setTimeout(() => {
  //       $asteroids.removeChild($asteroids.firstChild)
  //     }, 10000)
  //   } else {
  //     asteroid.innerHTML === '<img src="img/explo2.png" alt="nuclear explo">'
  //       ? $asteroids.removeChild($asteroids[i])
  //       : $asteroids.removeChild($asteroids.firstChild)
  //   }
  // }, 1000 * 100 * time)

  setTimeout(() => {
    clearInterval(int)
    if (asteroid.innerHTML === '<img src="img/asteroid.png" alt="asteroid">') {
      asteroid.classList.add('nuclear-explo')
      asteroid.innerHTML = '<img src="img/explo2.png" alt="nuclear explo">'
      asteroid.style.filter = 'opacity(0)'
      counterToEnd--
      if (counterToEnd > 0) {
        $population.textContent = `Earth population: ${counterToEnd} 000 000 000`
      } else {
        $population.textContent = `Earth population: all died`
      }
      setTimeout(() => {
        for (let i = 0; i < $asteroids.length; i++) {
          if (
            asteroid.innerHTML ===
            '<img src="img/explo2.png" alt="nuclear explo">'
          ) {
            $asteroids.removeChild($asteroids.firstChild)
          }
        }
      }, 10000)
    } else {
      for (let i = 0; i < $asteroids.length; i++) {
        if (
          asteroid.innerHTML === '<img src="img/asteroid.png" alt="asteroid">'
        ) {
          $asteroids.removeChild($asteroids[i])
        }
      }
    }
  }, 1000 * 100 * time)
}

function createBeam() {
  let y = 0
  let beam = document.createElement('div')
  beam.classList.add('beam')
  beam.style.left = `${sx + 50}px`
  beam.style.top = `${y}px`
  beam.innerHTML = '<img src="img/beam.png" alt="beam">'
  $beams.insertAdjacentElement('beforeend', beam)
  const int = setInterval(() => {
    y -= 50
    beam.style.top = `${y}px`
  }, 1000 * time)

  setTimeout(() => {
    $beams.removeChild($beams.firstChild)
    clearInterval(int)
  }, 1000 * 20 * time)

  if (checkAsteroids) {
    let delay

    for (let i = 0; i < checkAsteroids.length; i++) {
      if (
        checkAsteroids[i].offsetLeft === beam.offsetLeft - 30 &&
        checkAsteroids.length >= 0
      ) {
        if (checkAsteroids[i].offsetTop < 100) {
          delay = 1.1
        } else if (checkAsteroids[i].offsetTop < 250) {
          delay = 0.9
        } else if (checkAsteroids[i].offsetTop < 400) {
          delay = 0.5
        } else if (checkAsteroids[i].offsetTop < 600) {
          delay = 0.2
        }
      }
    }

    setTimeout(() => {
      for (let i = 0; i < checkAsteroids.length; i++) {
        if (
          checkAsteroids[i].offsetLeft === beam.offsetLeft - 30 &&
          checkAsteroids.length >= 0 &&
          !checkAsteroids[i].classList.contains('nuclear-explo')
        ) {
          checkAsteroids[i].innerHTML = '<img src="img/explo.png" alt="explo">'
          checkAsteroids[i].style.transition = '5s'
          checkAsteroids[i].style.filter = 'opacity(0)'
          counter++
          $score.textContent = `Score: ${counter}`
        }
      }
    }, 1000 * delay)
  }
}

const autoShot = {
  start() {
    return setInterval(() => {
      createBeam()
    }, 1000 * lvl)
  },
  stop(int) {
    clearInterval(int)
  },
}

let auto
function keyPress(event) {
  if (
    (event.key.toLowerCase() === 'd' || event.key.toLowerCase() === 'в') &&
    !end &&
    sx < 1600
  ) {
    sx += 150
    $ship.style = `--sx:${sx}px`
  }

  if (
    (event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'ф') &&
    !end &&
    sx > 100
  ) {
    sx -= 150
    $ship.style = `--sx:${sx}px`
  }

  if (event.key === ' ' && !end) {
    createBeam()
  }

  if (
    (event.key.toLowerCase() === 'q' || event.key.toLowerCase() === 'й') &&
    !end &&
    !auto
  ) {
    auto = autoShot.start()
  }
  if (
    event.key.toLowerCase() === 'e' ||
    (event.key.toLowerCase() === 'у' && !end)
  ) {
    autoShot.stop(auto)
    auto = undefined
  }
}

function startGame() {
  document.querySelector('html').style.cursor = 'none'
  return setInterval(() => {
    counterToEnd > 0 ? createAsteroid() : endGame()
  }, 1000 * lvl)
}

let intervalGame
function endGame() {
  $endGame.classList.add('end-game-show')
  $results.textContent = `Your score: ${counter}`
  document.querySelector('html').style.cursor = ''
  $cloud.style.display = 'none'
  clearInterval(intervalGame)
  end = true
  autoShot.stop(auto)
  auto = undefined
}

const control = `<ul><li>Move left : A</li>
<li>Move right: D</li>
<li>Fire: SPACE</li>
<li>Start autofire: Q</li>
<li>Stop autofire: E</li></ul>`

const innerLvl = `<ul class="set-lvl" id="set-lvl"><li data-num="1">x1 </li>
<li data-num="2">x2 </li>
<li data-num="3">x3 </li>
<li data-num="4">x4 </li>
<li data-num="5">x5 </li></ul>`

const about = `This web-game it is my second JS-project.<br>
If you find some bugs or issues, please let me know about.<br>
I need feedback for upgrade my skills :)`

function setAbout() {
  $text.style.display = 'flex'
  $text.style.color = '#00ade1'
  $text.style.fontSize = '20px'
  $text.style.textAlign = 'center'
  $text.style.lineHeight = '2.5'
  $list.style.display = 'none'
  $text.innerHTML = about
  $arrow.style.display = 'block'
}

function setLvl() {
  $text.style.display = 'flex'
  $text.style.lineHeight = '1'
  $list.style.display = 'none'
  $text.innerHTML = innerLvl
  $arrow.style.display = 'block'
  $setLvl = document.querySelector('#set-lvl')
  $setLvl.addEventListener('click', changeLvl)
}

function changeLvl(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    if (event.target.dataset.num == '1') {
      lvl = 1.2
    }
    if (event.target.dataset.num == '2') {
      lvl = 1
    }
    if (event.target.dataset.num == '3') {
      lvl = 0.8
    }
    if (event.target.dataset.num == '4') {
      lvl = 0.7
    }
    if (event.target.dataset.num == '5') {
      lvl = 0.5
    }

    let li = document.querySelectorAll('#set-lvl li')
    for (let i = 0; i < li.length; i++) {
      li[i].style.color = '#00ade1'
      li[i].style.transform = 'translateX(0px) scale(1)'
    }
    event.target.style.color = '#fff'
    event.target.style.transform = 'translateX(30px) scale(1.2)'
  }
}

function hideList() {
  $text.style.display = 'flex'
  $text.style.lineHeight = '1'
  $text.style.textAlign = 'start'
  $text.innerHTML = control
  $list.style.display = 'none'
  $arrow.style.display = 'block'
}

function reset() {
  $text.style.display = 'none'
  $arrow.style.display = 'none'
  $list.style.display = 'flex'
}

function refresh() {
  $menu.classList.remove('hide')
  $menu.style.display = 'flex'
  $container.style.display = 'none'
  $endGame.classList.remove('end-game-show')
  counter = 0
  counterToEnd = 8
}

function choise(event) {
  if (event.target.dataset.text === ' Start') {
    $menu.classList.add('hide')
    setTimeout(() => {
      $menu.style.display = 'none'
      $container.style.display = 'block'
      intervalGame = startGame()
    }, 3000)
  }

  if (event.target.dataset.text === ' Control') {
    hideList()
  }

  if (event.target.dataset.text === ' Lvl') {
    setLvl()
  }

  if (event.target.dataset.text === ' About') {
    setAbout()
  }
}


let isShow = false
function showHelp() {
  isShow ? $cloud.style.display = 'none' : $cloud.style.display = 'flex'
  // isShow ? isShow = false : isShow = true
}

document.addEventListener('keypress', keyPress)
$list.addEventListener('click', choise)
$arrow.addEventListener('click', reset)
$refresh.addEventListener('click', refresh)
$earth.addEventListener('click', showHelp)
