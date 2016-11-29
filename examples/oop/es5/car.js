function Car(make, model, color) {
  this.make = make;
  this.model = model;
  this.color = color;
  this.speed = 0;
}
Car.prototype.toString = function() {
  return this.color + ' ' +
         this.make + ' ' +
         this.model + ' is traveling at ' +
         this.speed + ' mph';
};
Car.prototype.accelerate = function(amount) {
  this.speed += amount;
};
Car.prototype.decelerate = function(amount) {
  this.speed -= amount;
};

module.exports = Car;
