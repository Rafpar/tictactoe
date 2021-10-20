import { BoardEntity } from '../schemas/board.schema';

export class BoardUtils {
  A;
  B;
  C;
  board;

  constructor(board: BoardEntity) {
    this.setupBoardFields(board);
    this.renderBoard(board);
  }

  setupBoardFields(board: BoardEntity) {
    this.A = { A1: board.A1, A2: board.A2, A3: board.A3 };
    this.B = { B1: board.B1, B2: board.B2, B3: board.B3 };
    this.C = { C1: board.C1, C2: board.C2, C3: board.C3 };
  }
  getEmptyFieldsCount() {
    let emptyFieldCount = 0;
    const boardRows = [this.A, this.B, this.C];
    boardRows.forEach((row) => {
      for (const field in row) {
        if (row[field] === null) {
          emptyFieldCount++;
        }
      }
    });
    return emptyFieldCount;
  }

  renderBoard(board: BoardEntity) {
    this.board =
      '_' +
      this.renderField(board.A1) +
      '_|_' +
      this.renderField(board.A2) +
      '_|_' +
      this.renderField(board.A3) +
      '_<br>' +
      '_' +
      this.renderField(board.B1) +
      '_|_' +
      this.renderField(board.B2) +
      '_|_' +
      this.renderField(board.B3) +
      '_<br>' +
      '_' +
      this.renderField(board.C1) +
      '_|_' +
      this.renderField(board.C2) +
      '_|_' +
      this.renderField(board.C3) +
      '_';
  }
  getBoard(): string {
    return this.board;
  }
  renderField(field): string {
    if (field === null) {
      return '_';
    } else {
      return field;
    }
  }
}
