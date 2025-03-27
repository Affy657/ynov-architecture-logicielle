import 'dotenv/config';
import Rover from './modules/Rover/rover';
import { Orientation } from './modules/Rover/rover.interface';

new Rover({ x: 0, y: 0, orientation: Orientation.Nord });