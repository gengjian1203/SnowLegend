import { Event } from "cc";

export default class MyEvent extends Event {
  constructor(name: string, bubbles?: boolean, detail?: any) {
    super(name, bubbles);
    this.detail = detail;
  }
  public detail: any = null; // 自定义的属性
}
