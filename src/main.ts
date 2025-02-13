import {Rover} from "./rover";
import {Orientation} from "./rover.interface";
import {Map} from "./map";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="read-the-docs">
      Hello world
    </p>
  </div>
`
const rover: Rover = new Rover({ x: 9, y: 0, orientation: Orientation.Est, map: new Map(10, 10) });
const etat = rover.Avancer();
console.log(etat)
