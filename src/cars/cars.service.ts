import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateCarDTO, UpdateCarDTO } from './dto';
import { Car } from './Interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jepp',
      model: 'Cheroqui',
    },
  ];

  public findAll() {
    return this.cars;
  }
  public findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  //public create({ brand, model }: CreateCarDTO) {  'Another way to destructure'
  public create(createCarDto: CreateCarDTO) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }

  public update(id: string, updateCarDto: UpdateCarDTO) {
    let carDB = this.findOne(id);
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(' Car id is not valid inside body');
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
  public delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const car = this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
