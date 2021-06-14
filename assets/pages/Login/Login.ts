import { _decorator, Component, Node } from "cc";
import { passiveShare, createLoginButton } from "./utils";
const { ccclass, property } = _decorator;

@ccclass("Login")
export class Login extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;
  start() {
    console.log("Login start...");
    passiveShare();
    createLoginButton();
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  // 点击测试功能
  handleBtnTestClick() {
    console.log("handleBtnTestClick");
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
