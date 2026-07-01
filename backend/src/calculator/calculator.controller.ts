import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CalculatorService } from './calculator.service';
import { CalculateDto } from './dto/calculate.dto';

@UseGuards(JwtAuthGuard)
@Controller('calculator')
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) {}

  @Post('calculate')
  calculate(@Req() req: any, @Body() dto: CalculateDto) {
    return this.calculatorService.calculate(req.user.userId, dto);
  }

  @Get('history')
  getHistory(@Req() req: any) {
    return this.calculatorService.getHistory(req.user.userId);
  }
}
