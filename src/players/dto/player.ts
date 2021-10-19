import { TictactoeSymbolType } from '../../board/enums/tictactoe-symbol-type';

export class Player {
  readonly name: string;
  readonly symbol: TictactoeSymbolType;

  constructor(name, symbol) {
    this.name = name;
    this.symbol = TictactoeSymbolType[symbol.toUpperCase()];
  }

  getPlayerName(): string {
    return this.name;
  }

  getPlayerSymbol(): TictactoeSymbolType {
    return this.symbol;
  }
}
