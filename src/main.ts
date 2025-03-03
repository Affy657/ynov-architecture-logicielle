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
const map = new Map(10, 10, [new Coord(0, 10)]);
const rover = new Rover({ x: 0, y: 9, orientation: Orientation.Sud, map: map });
const etat = rover.reculer();
console.log(etat)
