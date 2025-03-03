import {Rover} from "./rover";
import {Orientation} from "./rover.interface";
import {Map} from "./map";
import Coord from "./coord";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="read-the-docs">
      Hello world
    </p>
  </div>
`
const map = new Map(10, 10, [new Coord(0, 8), new Coord(0, 9)]);
const rover = new Rover({ x: 0, y: 9, orientation: Orientation.Sud, map: map });
const positionY = rover.getPositionY();
const positionX = rover.getPositionX();
rover.avancer();
console.log(positionY)
