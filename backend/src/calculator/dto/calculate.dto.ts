import { IsIn, IsNotEmpty } from 'class-validator';

export class CalculateDto {
  @IsNotEmpty({ message: 'First value is required' })
  a: string | number;

  @IsNotEmpty({ message: 'Second value is required' })
  b: string | number;

  @IsIn(['+', '-', '*', '/'], { message: 'Operator must be one of +, -, *, /' })
  operator: '+' | '-' | '*' | '/';
}
