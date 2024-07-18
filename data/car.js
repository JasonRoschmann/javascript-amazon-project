/* class Car {
    #brand;
    #model;
    speed; // Changed back to public

    constructor(brand = 'BMW', model = 'X6') {
        this.#brand = brand;
        this.#model = model;
        this.speed = 0; // Initialize speed to 0
        this.isTrunkOpen = false; // Initialize trunk status to closed
    }

    // Method to display car information
    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk Open: ${this.isTrunkOpen}`);
    }

    // Method to increase speed
    go() {
        if (this.isTrunkOpen) {
            console.log("Can't move, the trunk is open!");
            return;
        }

        if (this.speed + 5 <= 200) {
            this.speed += 5;
        } else {
            this.speed = 200; // Cap the speed at 200
        }
    }

    // Method to decrease speed
    brake() {
        if (this.speed - 5 >= 0) {
            this.speed -= 5;
        } else {
            this.speed = 0; // Do not go below 0
        }
    }

    // Method to open trunk
    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        } else {
            console.log("Can't open the trunk while moving!");
        }
    }

    // Method to close trunk
    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

const car = new Car();

// Testing Car class methods
car.openTrunk();
car.displayInfo(); // Should show trunk open
car.go(); // Should not work because trunk is open
car.closeTrunk();
car.go();
car.go();
car.displayInfo(); // Should show speed as 10 km/h

car.brake();
car.displayInfo(); // Should show speed as 5 km/h

car.go();
car.go();
car.go();
car.displayInfo(); // Should show speed as 20 km/h

car.brake();
car.brake();
car.brake();
car.displayInfo(); // Should show speed as 5 km/h

// Speed should not exceed 200 km/h
for (let i = 0; i < 50; i++) {
    car.go();
}
car.displayInfo(); // Should show speed as 200 km/h

// Speed should not go below 0 km/h
for (let i = 0; i < 50; i++) {
    car.brake();
}
car.displayInfo(); // Should show speed as 0 km/h

class RaceCar extends Car {
    constructor(brand, model, acceleration = 20) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    // Override go() to increase speed by acceleration
    go() {
        if (this.isTrunkOpen) {
            console.log("Can't move, the trunk is open!");
            return;
        }

        if (this.speed + this.acceleration <= 300) {
            this.speed += this.acceleration;
        } else {
            this.speed = 300; // Cap the speed at 300
        }
    }

    // Override openTrunk() to indicate no trunk
    openTrunk() {
        console.log("Race cars do not have a trunk!");
    }

    // Override closeTrunk() to indicate no trunk
    closeTrunk() {
        console.log("Race cars do not have a trunk!");
    }
}

const raceCar = new RaceCar('McLaren', 'F1', 20);

// Testing RaceCar class methods
raceCar.go();
raceCar.displayInfo(); // Should show speed as 20 km/h

raceCar.go();
raceCar.displayInfo(); // Should show speed as 40 km/h

raceCar.brake();
raceCar.displayInfo(); // Should show speed as 35 km/h

// Speed should not exceed 300 km/h
for (let i = 0; i < 20; i++) {
    raceCar.go();
}
raceCar.displayInfo(); // Should show speed as 300 km/h

// Speed should not go below 0 km/h
for (let i = 0; i < 60; i++) {
    raceCar.brake();
}
raceCar.displayInfo(); // Should show speed as 0 km/h

// Trunk operations
raceCar.openTrunk(); // Should print race cars do not have a trunk
raceCar.closeTrunk(); // Should print race cars do not have a trunk
*/