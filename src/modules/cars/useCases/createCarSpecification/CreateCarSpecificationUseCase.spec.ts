import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to a now-existent car", () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: "11231321",
        specifications_id: ["2134241414"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "999-999",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: ["2134241414"],
    });
  });
});
