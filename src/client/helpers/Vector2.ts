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
        return ar.find(v => this.equal(v)) !== undefined;
    }

    equal(a: Vector2): boolean {
        return this.x === a.x && this.y === a.y;
    }

    static UP(): Vector2 {
        return new Vector2(0, -1);
    }
    static DOWN(): Vector2 {
        return new Vector2(0, 1);
    }
    static RIGHT(): Vector2 {
        return new Vector2(1, 0);
    }
    static LEFT(): Vector2 {
        return new Vector2(-1, 0);
    }
}