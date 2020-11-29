const image = document.querySelector('img')
const title = document.getElementById('title')
const Artist = document.getElementById('Artist')
const music = document.querySelector('audio')
const prevBtn = document.getElementById('Prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('Next')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const DurationL = document.getElementById('duration')
const CurrentDur = document.getElementById('current-duration')

let isPlaying = 'false'

const song = [
  {
    name: 'p1',
    title: 'ukele',
    Artist: 'Benjamin Tissot',
  },
  {
    name: 'p2',
    title: 'Creative Minds',
    Artist: 'Benjamin Tissot',
  },
  {
    name: 'p3',
    title: 'A New Beginning',
    Artist: 'Benjamin Tissot',
  },
]
//PlaySong

function playSong() {
  isPlaying = true
  playBtn.classList.add('fa-pause')
  playBtn.classList.remove('fa-play')
  playBtn.setAttribute('title', 'Pause')
  music.play()
}

//PauseSong

function pauseSong() {
  isPlaying = false
  playBtn.classList.add('fa-play')
  playBtn.classList.remove('fa-pause')
  playBtn.setAttribute('title', 'Play')
  music.pause()
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

let songIndex = 0

// Update Dom
function UpdateSong(song) {
  title.textContent = song.title
  Artist.textContent = song.Artist
  music.src = `Images/Audio/${song.name}.mp3`
  image.src = `Images/${song.name}.jpg`
}

function prevSong() {
  songIndex === 0 ? (songIndex = song.length - 1) : songIndex--
  UpdateSong(song[songIndex])
  console.log(isPlaying)
  playSong()
}
function nextSong() {
  songIndex === song.length - 1 ? (songIndex = 0) : songIndex++
  UpdateSong(song[songIndex])
  playSong()
}

// on load song
UpdateSong(song[songIndex])

function UpdateProgressbar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    const ProgressPercent = (currentTime / duration) * 100
    progress.style.width = `${ProgressPercent}%`

    //   SongDuration

    let redDuration = duration - currentTime
    console.log(redDuration)

    let durationMinute = Math.floor(redDuration / 60)
    if (durationMinute < 1) {
      durationMinute = `0${durationMinute}`
    }
    let durationSecond = Math.floor(duration % 60)
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`
    }
    if (durationSecond) {
      DurationL.textContent = `${durationMinute}:${durationSecond}`
    }

    //   Current Time

    let currentMinute = Math.floor(currentTime / 60)
    if (currentMinute < 1) {
      currentMinute = `0${currentMinute}`
    }
    let currentSecond = Math.floor(currentTime % 60)
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`
    }
    if (currentSecond) {
      CurrentDur.textContent = `${currentMinute}:${currentSecond}`
    }
  }
}

function setProgress(e) {
  const Width = this.clientWidth
  console.log(`width: ${Width}`)
  const ClickX = e.offsetX
  console.log('ClickX', ClickX)
  progress.style.width = `${ClickX}%`
  const { duration } = music
  console.log(ClickX / Width)
  console.log((ClickX / Width) * duration)
  music.currentTime = (ClickX / Width) * duration
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', UpdateProgressbar)
progressContainer.addEventListener('click', setProgress)
