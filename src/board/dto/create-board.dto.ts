import { GameSetupDto } from '../../game/dto/game-setup.dto';

export class CreateBoardDto {
  _id: number;
  locked: boolean;
  A1: string;
  A2: string;
  A3: string;
  B1: string;
  B2: string;
  B3: string;
  C1: string;
  C2: string;
  C3: string;

  constructor(gameSetupDto: GameSetupDto) {
    this.setDefaultFieldValues(gameSetupDto);
  }

  private setDefaultFieldValues(gameSetupDto: GameSetupDto) {
    this._id = gameSetupDto.id;
    this.locked = false;
    this.A1 = null;
    this.A2 = null;
    this.A3 = null;
    this.B1 = null;
    this.B2 = null;
    this.B3 = null;
    this.C1 = null;
    this.C2 = null;
    this.C3 = null;
  }
}
