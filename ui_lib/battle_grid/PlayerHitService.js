export class PlayerHitService {
  constructor(cellHitManager) {
    this._cellHitManager = cellHitManager
  }

  hitCell(event, cells, gridRect, cellSize) {
    this._cellHitManager.processCellHit(event, cells, gridRect, cellSize)
  }
}
