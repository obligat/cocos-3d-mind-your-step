import { _decorator, Component, EventMouse, input, Input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    // 是否接受到跳跃指令
    private _startJump: boolean = false;
    // 跳跃步长
    private _jumpStep: number = 0;

    start() {
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
    }

    onMouseUp(event: EventMouse) {

    }

    update(deltaTime: number) {
        if (this._startJump) {
            
        }
    }
}

