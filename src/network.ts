import {Rover} from "./rover";
import {Orientation} from "./rover.interface";

const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Nord });
console.log('Network initialized');
