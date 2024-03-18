import { MessageType, MoveMessageArgs, StartMessageArgs, createMoveMessageArgs } from "../../general/messages";
import Vector2 from "../../general/helpers/Vector2";
import { Color } from "../helpers/enums";
import Network from "../network/Network";
import FigureStore from "../storages/FigureStore";
import GameStore from "../storages/GameStore";

export default class TurnHandler {
    store: GameStore;
    network: Network;

    constructor(store: GameStore, network: Network) {
        this.store = store;
        this.network = network;

        this.network.socket.on(MessageType.START, (args) => this.onNetworkStart(args))
        this.network.socket.on(MessageType.MOVE, (args) => this.onNetwormMove(args))
    }
    
    handleMove(figure: FigureStore, to: Vector2, local: boolean = false) {
        if (!this.store.isFree(to)){
            const enemyFigure = this.store.getFigureAt(to);
            if(enemyFigure){
                this.store.figures.remove(enemyFigure);
            }
        }
        if(!local){
            this.network.socket.emit(MessageType.MOVE, createMoveMessageArgs(figure.position.get(), to));
        }
        figure.position.set(to);
        this.store.turn.set(this.store.turn.get() === Color.BLACK? Color.WHITE : Color.BLACK);
    }

    onNetworkStart(args: StartMessageArgs){
        this.store.myColor.set(args.isFirst? Color.WHITE : Color.BLACK);
    }

    onNetwormMove(args: MoveMessageArgs){
        const from = new Vector2(args.fromX, args.fromY);
        const to = new Vector2(args.toX, args.toY);

        const figure = this.store.getFigureAt(from);
        if (figure){
            this.handleMove(figure, to, true);
        }
        else{
            throw `Не найдена фигура на позиции ${from.toString()}`
        }
    }

} 