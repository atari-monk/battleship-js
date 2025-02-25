export function getRelativeCoordinates(vector, rect) {
  return {
    x: vector.x - rect.left,
    y: vector.y - rect.top,
  }
}
