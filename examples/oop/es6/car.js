class Car {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
    this.speed = 0;
  }
  toString() {
    return this.color + ' ' +
           this.make + ' ' +
           this.model + ' is traveling at ' +
           this.speed + ' mph';
  }
  accelerate(amount) {
    this.speed += amount;
  }
  decelerate(amount) {
    this.speed -= amount;
  }
}

module.exports = Car;
