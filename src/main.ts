import 'dotenv/config';
import Rover from './Rover';
import { Orientation } from './rover.interface';

new Rover({ x: 0, y: 0, orientation: Orientation.Nord });