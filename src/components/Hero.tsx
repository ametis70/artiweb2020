import p5Types from 'p5'
import { useEffect } from 'react'
import Sketch from 'react-p5'
import shuffle from 'lodash/shuffle'
import { useRouter } from 'next/router'

import { HeroObra } from '../pages'
import { green, magenta } from '../theme'
import { getBasePath } from '../lib/util'
import global from '../lib/global.preval'

import alumnesImage from '../img/sketch_icons/alumnes.png'
import obrasImage from '../img/sketch_icons/obras.png'
import calendarImage from '../img/sketch_icons/calendar.png'
import festivalImage from '../img/sketch_icons/festival.png'
import tallerImage from '../img/sketch_icons/t5.png'

interface AvatarI {
  p5: p5Types
  position: p5Types.Vector
  wrapping: boolean
  data: AvatarData
  drawn: boolean
  img: p5Types.Image
  loadAndDraw: () => void
  drawImage: () => void
  drawOverlay: () => void
  getPosition: () => p5Types.Vector
  getWrapping: () => boolean
  getData: () => AvatarData
  getDrawn: () => boolean
  mouseOver: () => boolean
}

type AvatarData = {
  image: string
  url: string
  size: number
  overlay: boolean
}

const siteData = [
  {
    url: '/alumnes',
    name: 'Alumnes',
    image: alumnesImage,
  },
  {
    url: '/obras',
    name: 'Obras',
    image: obrasImage,
  },
  {
    url: '/cronograma',
    name: 'Cronograma',
    image: calendarImage,
  },
  {
    url: '/festival',
    name: 'Festival',
    image: festivalImage,
  },
  {
    url: 'https://taller5.ludic.cc/',
    name: 'Taller de Diseño Multimedial V',
    image: tallerImage,
  },
]

function divideGetClosestInteger(input: number, max: number): number {
  let closest = max
  let found = false

  while (!found) {
    const result = input / closest

    if (result === Math.floor(result)) {
      found = true
    } else {
      closest--
    }
  }

  return closest
}

const circleRadius = 128 + window.innerWidth * 0.01

type stateTypes = {
  DEBUG: boolean
  avatars: AvatarI[]
  circleRadius: number
  spacingY: number
  spacingX: number
  positionVector: p5Types.Vector
  graphics: p5Types.Graphics
  mask: p5Types.Graphics
  graphicsImage: p5Types.Image
  avatarsData: AvatarData[]
  autoadvanceSpeed: number
  currentSpeed: number
  mouseBorderThreshold: number
  pressedPosition: p5Types.Vector
  postLoadRun: boolean
  gp5: p5Types
}

const state: stateTypes = {
  DEBUG: false,
  pressedPosition: null,
  avatars: [],
  circleRadius,
  spacingX: circleRadius * 2,
  spacingY: circleRadius * 1.75,
  positionVector: null,
  graphics: null,
  graphicsImage: null,
  mask: null,
  avatarsData: [],
  autoadvanceSpeed: 4,
  currentSpeed: 0,
  mouseBorderThreshold: 0,
  postLoadRun: false,
  gp5: null,
}

const { DEBUG, avatars, spacingX, spacingY, autoadvanceSpeed } = state

let {
  avatarsData,
  positionVector,
  graphics,
  mask,
  currentSpeed,
  mouseBorderThreshold,
  graphicsImage,
  pressedPosition,
  postLoadRun,
  gp5,
} = state

const Hero: React.FC<{ obras: HeroObra[]; setHeroLoaded: (arg: boolean) => void }> = ({
  obras,
  setHeroLoaded,
}) => {
  const router = useRouter()

  class Avatar implements AvatarI {
    p5: p5Types
    position: p5Types.Vector
    wrapping: boolean
    data: AvatarData
    drawn: boolean
    img: p5Types.Image

    constructor(
      p5: p5Types,
      position: p5Types.Vector,
      data: AvatarData,
      wrapping: boolean,
    ) {
      if (position) {
        this.position = position
      } else {
        this.position = p5.createVector(
          p5.random(circleRadius / 2, graphics.width - circleRadius / 2),
          p5.random(circleRadius, graphics.height - circleRadius / 2),
        )
      }

      this.data = data
      this.wrapping = wrapping
      this.p5 = p5
    }

    loadAndDraw() {
      this.p5.loadImage(this.data.image, (img) => {
        this.img = img
        this.drawImage()
      })
    }

    drawImage() {
      graphics.fill('black')
      graphics.ellipse(
        this.position.x - graphics.width,
        this.position.y,
        circleRadius,
        circleRadius,
      )

      const avatarScale = 1.1
      const scaleFactor = avatarScale

      const height =
        scaleFactor === avatarScale ? circleRadius * avatarScale : circleRadius
      const width =
        scaleFactor === avatarScale
          ? circleRadius * avatarScale
          : circleRadius * scaleFactor

      graphics.image(this.img, this.position.x, this.position.y, width, height)
      if (this.wrapping) {
        graphics.image(
          this.img,
          this.position.x - graphics.width,
          this.position.y,
          width,
          height,
        )
      }
      this.drawn = true
    }

    drawOverlay() {
      if (!this.data.overlay) {
        this.drawImage()
        return
      }
      graphics.push()
      graphics.blendMode(this.p5.SOFT_LIGHT)
      graphics.fill(green)
      graphics.ellipse(this.position.x, this.position.y, circleRadius, circleRadius)
      if (this.wrapping) {
        graphics.ellipse(
          this.position.x - graphics.width,
          this.position.y,
          circleRadius,
          circleRadius,
        )
      }
      graphics.pop()
    }

    getPosition() {
      return this.position
    }

    getWrapping() {
      return this.wrapping
    }

    getData() {
      return this.data
    }

    getDrawn() {
      return this.drawn
    }

    mouseOver() {
      if (
        this.p5.mouseY < mouseBorderThreshold ||
        this.p5.mouseY > this.p5.height - mouseBorderThreshold
      )
        return

      if (
        this.p5.dist(
          this.p5.mouseX - positionVector.x,
          this.p5.mouseY - positionVector.y,
          this.position.x,
          this.position.y,
        ) <
          circleRadius / 2 ||
        this.p5.dist(
          this.p5.mouseX - positionVector.x,
          this.p5.mouseY - positionVector.y,
          this.position.x - graphics.width,
          this.position.y,
        ) <
          circleRadius / 2
      ) {
        return true
      }
      return false
    }
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    gp5 = p5
    p5.disableFriendlyErrors = true // disables FES
    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
    cnv.style('display', 'block')
    positionVector = p5.createVector(p5.width / 2, 0)
    pressedPosition = p5.createVector(-1, -1)

    setInterval(() => {
      p5.mouseX = p5.mouseY = -1
    }, 10000)

    render(p5)
  }

  const render = (p5: p5Types) => {
    global.alumnes.forEach((a) =>
      avatarsData.push({
        image: `${getBasePath()}/${a.avatar.jpg[1].path}`,
        url: `/alumnes?alumne=${a.slug}`,
        size: a.avatar.jpg[1].width,
        overlay: true,
      }),
    )

    obras.forEach((o) => {
      avatarsData.push({
        image: `${getBasePath()}/${o.banner.path}`,
        url: `/obras/${o.slug}`,
        size: o.banner.width,
        overlay: true,
      })
    })

    siteData.forEach((s) => {
      avatarsData.push({
        image: `${getBasePath()}${s.image.src}`,
        size: s.image.width,
        url: s.url,
        overlay: false,
      })
    })

    avatarsData = shuffle(avatarsData)

    const numberOfAvatars = avatarsData.length
    const maxRows = Math.floor(p5.height / spacingY)
    const rows = divideGetClosestInteger(numberOfAvatars, maxRows)
    const avatarsPerRow = numberOfAvatars / rows
    const offsetY = 1 - (Math.ceil(p5.height / spacingY) - p5.height / spacingY)

    graphics = p5.createGraphics(spacingX * avatarsPerRow, p5.height)
    graphics.imageMode(p5.CENTER)
    graphics.noStroke()

    for (let x = 0, y = 0; x < numberOfAvatars; x++) {
      if (x > 0 && x % avatarsPerRow === 0) {
        y++
      }

      const offsetX = y % 2 === 0 ? 0 : spacingX / 2

      const posX = spacingX / 2 + spacingX * x - y * spacingX * avatarsPerRow + offsetX
      const posY = y * spacingY + (spacingY * offsetY) / 2 + spacingY / 2
      const wrapping = posX > graphics.width - spacingX / 2
      avatars[x] = new Avatar(p5, p5.createVector(posX, posY), avatarsData[x], wrapping)
    }

    mask = p5.createGraphics(graphics.width, graphics.height)
    mask.fill('rgba(0, 0, 0, 1)')
    mask.noStroke()

    // avatars = Array(20).fill(null).map((_, i) => new Avatar(createVector()))
    mouseBorderThreshold = p5.width / 100 // disable mouse after threshold

    avatars.forEach((avatar) => {
      avatar.loadAndDraw()
      const pos = avatar.getPosition()
      const wrap = avatar.getWrapping()
      mask.circle(pos.x, pos.y, circleRadius)
      if (wrap) {
        mask.circle(pos.x - mask.width, pos.y, circleRadius)
      }
    })
  }

  const draw = (p5: p5Types) => {
    p5.background(magenta)

    if (avatars.length === 0 || !avatars.every((a) => a.drawn)) {
      return
    } else if (!postLoadRun) {
      graphics.filter(p5.GRAY)

      avatars.forEach((avatar) => {
        avatar.drawOverlay()
      })

      graphicsImage = graphics.get()
      graphicsImage.mask(mask.get())
      postLoadRun = true
      setHeroLoaded(true)
    }

    let shouldStop = false

    avatars.forEach((avatar) => {
      if (!shouldStop) {
        shouldStop = avatar.mouseOver()
      }
    })

    if (!shouldStop && !p5.mouseIsPressed) {
      if (currentSpeed < autoadvanceSpeed) {
        currentSpeed += (autoadvanceSpeed - currentSpeed) * 0.002
      }
      positionVector.x -= currentSpeed
      p5.cursor('grab')
    } else {
      currentSpeed = 0
      if (p5.mouseIsPressed) {
        p5.cursor('grabbing')
      } else {
        p5.cursor('pointer')
      }
    }

    if (positionVector.x > graphics.width) {
      const diff = positionVector.x - graphics.width
      positionVector.x = diff
    }

    if (positionVector.x < 0) {
      positionVector.x = graphics.width + positionVector.x
    }

    p5.translate(positionVector.x, positionVector.y)
    p5.image(graphicsImage, 0, 0)
    p5.image(graphicsImage, -graphics.width, 0)

    if (DEBUG) {
      p5.strokeWeight(5)
      p5.stroke('red')
      p5.line(0, 0, 0, graphics.height)
    }
  }

  const mouseDragged = (p5: p5Types) => {
    if (router.asPath !== '/') {
      return
    }
    positionVector.x = positionVector.x + p5.pmouseX - p5.mouseX
  }

  const mousePressed = (p5: p5Types) => {
    if (router.asPath !== '/') {
      return
    }
    pressedPosition.set(p5.mouseX, p5.mouseY)
  }

  const mouseReleased = (p5: p5Types) => {
    if (router.asPath !== '/') {
      return
    }

    if (p5.dist(p5.mouseX, p5.mouseY, pressedPosition.x, pressedPosition.y) < 10) {
      const avatar = avatars.find((avatar) => avatar.mouseOver())
      if (!avatar) return

      const { url } = avatar.getData()
      if (url.includes('http')) {
        window.open(url, '_newtab')
      } else {
        router.push(url)
      }
    }
  }

  useEffect(() => {
    if (gp5 && postLoadRun) {
      if (router.asPath !== '/') {
        gp5.noLoop()
      } else {
        console.log('calling loop')
        gp5.loop()
      }
    }
  }, [router.asPath])

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseDragged={mouseDragged}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default Hero
