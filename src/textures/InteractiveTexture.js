import * as THREE from 'three'

const size = 64
const trail = []
const maxAge = 120
const radius = 0.15

const canvas = document.createElement('canvas')
canvas.width = canvas.height = size
const texture = new THREE.Texture(canvas)

const context = canvas.getContext('2d')

const easeOutSine = (t, b, c, d) => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

const clear = () => {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

clear()

const draw = point => {
  const position = {
    x: point.x * size,
    y: (1 - point.y) * size
  }

  let intensity = 1
  if (point.age < maxAge * 0.3) {
    intensity = easeOutSine(point.age / (maxAge * 0.3), 0, 1, 1)
  } else {
    intensity = easeOutSine(1 - (point.age - maxAge * 0.3) / (maxAge * 0.7), 0, 1, 1)
  }

  intensity *= point.force

  const adjustedRadius = size * radius * intensity
  const gradient = context.createRadialGradient(
    position.x, position.y, adjustedRadius * 0.25,
    position.x, position.y, adjustedRadius
  )
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)')

  context.beginPath()
  context.fillStyle = gradient
  context.arc(position.x, position.y, adjustedRadius, 0, Math.PI * 2)
  context.fill()
}

const addTouch = newPoint => {
  let force = 0
  const mostRecentPoint = trail[trail.length - 1]

  if (mostRecentPoint) {
    const xDistanceTravelled = mostRecentPoint.x - newPoint.x
    const yDistanceTravelled = mostRecentPoint.y - newPoint.y
    const combinedValues = xDistanceTravelled * xDistanceTravelled + yDistanceTravelled * yDistanceTravelled
    // Multiplying by itself is processed faster than Math.pow and ** ... not entirely sure what value squaring these gives
    force = Math.min(combinedValues * 10000, 1)
  }

  trail.push({ x: newPoint.x, y: newPoint.y, age: 0, force })
}

const update = () => {
  clear()

  // age points
  trail.forEach((point, i) => {
    point.age++

    // Remove ye olde points
    if (point.age > maxAge) {
      trail.splice(i, 1)
    }
  })

  trail.forEach(draw)

  texture.needsUpdate = true

}

const InteractiveTexture = {
  update,
  addTouch,
  texture
}
export default InteractiveTexture