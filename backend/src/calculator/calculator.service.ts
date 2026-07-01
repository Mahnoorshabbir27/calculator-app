import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { History, HistoryDocument } from './history.schema';
import { CalculateDto } from './dto/calculate.dto';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  private parseNumber(value: string | number, label: string): number {
    if (value === undefined || value === null || value === '') {
      throw new BadRequestException(`${label} value is required`);
    }
    const num = typeof value === 'number' ? value : Number(value);
    if (Number.isNaN(num)) {
      throw new BadRequestException(`${label} value must be a valid number`);
    }
    return num;
  }

  async calculate(userId: string, dto: CalculateDto) {
    const a = this.parseNumber(dto.a, 'First');
    const b = this.parseNumber(dto.b, 'Second');

    let result: number;
    switch (dto.operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        if (b === 0) {
          throw new BadRequestException('Cannot divide by zero');
        }
        result = a / b;
        break;
      default:
        throw new BadRequestException('Unsupported operator');
    }

    const expression = `${a} ${dto.operator} ${b}`;

    const entry = await this.historyModel.create({
      userId: new Types.ObjectId(userId),
      expression,
      result,
    });

    return {
      expression: entry.expression,
      result: entry.result,
      createdAt: (entry as any).createdAt,
    };
  }

  async getHistory(userId: string) {
    const records = await this.historyModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();

    return records.map((r) => ({
      id: r.id,
      expression: r.expression,
      result: r.result,
      createdAt: (r as any).createdAt,
    }));
  }
}
