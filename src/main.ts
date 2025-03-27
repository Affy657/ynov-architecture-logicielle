import 'dotenv/config';
import Rover from './modules/rover/rover';
import { Orientation } from './modules/rover/rover.interface';

new Rover({ x: 0, y: 0, orientation: Orientation.Nord });