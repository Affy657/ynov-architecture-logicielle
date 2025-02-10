import {IMaps} from "./maps.interface";

export class Map implements IMaps{

    private readonly max_x: number;
    private readonly max_y: number;

    constructor(x: number, y: number) {
        this.max_x = x;
        this.max_y = y;

    }

    public GetMaxX(): number {
        return this.max_x;
    }

    public GetMaxY(): number {
        return this.max_y;
    }
} 