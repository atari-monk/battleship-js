export class PlayerHitService {
  constructor(cellHitService) {
    this._cellHitService = cellHitService
  }

  hitCell(event, cells, gridRect, cellSize) {
    this._cellHitService.hitCell(event, cells, gridRect, cellSize)
  }
}
