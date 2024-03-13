export default class Vector2 {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    isValid(): boolean {
        return this.x >= 0 && this.y >= 0 && this.x <=7 && this.y <= 7;
    }

    add(x: number, y: number): Vector2 {
        return new Vector2(this.x + x, this.y + y);
    }

    in(ar: Vector2[]): boolean {
        return ar.find(v => v.x === this.x && v.y === this.y) !== undefined;
    }
}