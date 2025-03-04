import {Rover} from "./rover";
import {Orientation} from "./rover.interface";
import {RoverInterpreter} from "./roverInterpreter";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="read-the-docs">
      Hello world
    </p>
  </div>
`
const inputOptions = {
    orientation: Orientation.Ouest,
    x: 0,
    y: 0,
};
const rover: Rover = new Rover(inputOptions);
RoverInterpreter.interpreterCommands('a r g d', rover);
console.log(rover.getPositionX(),rover.getPositionY(),rover.getOrientation())
