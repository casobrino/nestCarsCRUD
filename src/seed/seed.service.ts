import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRAND_SEED } from './data/brands.seed';
import { CARS_SEED } from './data/cars.seed';
@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly BrandService: BrandsService,
  ) {}
  populateDB() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.BrandService.fillBrandsWithSeedData(BRAND_SEED);
    return 'Seed executed';
  }
}
