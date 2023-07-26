import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterModel } from './enums/counter.model.enums';
import { Counter, CounterDocument } from './schemas/counter.schema';

@Injectable()
export class CounterService {
  private static COUNTER_START_MIN_NUMBER = 100000000;

  constructor(
    @InjectModel(Counter.name)
    private counterModel: Model<CounterDocument>,
  ) {}

  private async createCounterModel(model: CounterModel, startNumber: number) {
    await this.counterModel.create({ entity: model, max: startNumber });
  }

  private getPrefixedId(model: CounterModel, id: number) {
    return `${model.toString().toUpperCase()}${id}`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  async getId(model: CounterModel) {
    const randomNumber = this.getRandomNumber();
    const res = await this.counterModel.findOneAndUpdate(
      { entity: model.toString() },
      { $inc: { max: randomNumber } },
    );
    if (res === null) {
      const id = CounterService.COUNTER_START_MIN_NUMBER + randomNumber;
      await this.createCounterModel(model, id);
      return this.getPrefixedId(model, id);
    }
    return this.getPrefixedId(model, res['max'] + randomNumber);
  }
}
