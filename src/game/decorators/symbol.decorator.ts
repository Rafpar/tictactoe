import { registerDecorator, ValidationOptions } from 'class-validator';
import { TictactoeSymbolType } from '../../board/enums/tictactoe-symbol-type';

export function IsTicTacToeSymbol(validationOptions?: ValidationOptions) {
  validationOptions = {};
  validationOptions.message = 'Symbol should be X or O';
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsTicTacToeSymbol',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            (value.toUpperCase() === TictactoeSymbolType.X ||
              value.toUpperCase() === TictactoeSymbolType.O)
          );
        },
      },
    });
  };
}
