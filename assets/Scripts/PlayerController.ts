import {
  _decorator,
  Component,
  EventMouse,
  input,
  Input,
  Node,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  // 是否接受到跳跃指令
  private _startJump: boolean = false;
  // 跳跃步长
  private _jumpStep: number = 0;
  // 当前跳跃时间
  private _curJumpTime: number = 0;
  // 每次跳跃时长
  private _jumpTime: number = 0.1;
  // 当前跳跃速度
  private _curJumpSpeed: number = 0;
  // 当前角色位置
  private _curPos: Vec3 = new Vec3();
  // 每次跳跃过程中，当前帧移动位置差
  private _deltaPos: Vec3 = new Vec3(0, 0, 0);
  // 角色目标位置
  private _targetPos: Vec3 = new Vec3();

  start() {
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0) {
      this.jumpByStep(1);
    } else if (event.getButton() === 2) {
      this.jumpByStep(2);
    }
  }

  jumpByStep(step: number) {
    // 跳跃过程中不接受输入
    if (this._startJump) {
      return;
    }

    // 开始跳跃
    this._startJump = true;
    // 本次跳跃的步数
    this._jumpStep = step;
    // 重置下跳跃的时间
    this._curJumpTime = 0;
    // 计算跳跃速度
    this._curJumpSpeed = this._jumpStep / this._jumpTime;
    // 获取角色当前的位置
    this.node.getPosition(this._curPos);
    // 目标位置 = 当前位置 + 步长
    Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0));
  }

  update(deltaTime: number) {
    if (this._startJump) {
      this._curJumpTime += deltaTime;

      if (this._curJumpTime > this._jumpTime) {
        // 跳跃结束
        // 强制位移到目标位置
        this.node.setPosition(this._targetPos);
        this._startJump = false;
      } else {
        // 跳跃中
        // tween
        // 获取当前位置
        this.node.getPosition(this._curPos);
        // 计算本帧应该位移的长度
        this._deltaPos.x = this._curJumpSpeed * deltaTime;
        // 将当前位置加上位移的长度
        Vec3.add(this._curPos, this._curPos, this._deltaPos);
        // 设置位移后的位置
        this.node.setPosition(this._curPos);
      }
    }
  }
}
