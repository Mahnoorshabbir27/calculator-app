import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { History, HistorySchema } from './history.schema';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    AuthModule, // provides JwtModule/strategy used by the guard
  ],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
