export class messageQueue {

  /*
  *   {
  *     trigger: Boolean, 
  *     key: String | Number
  *   }
  */

  constructor(messArr) {
    this.messageQueue = messArr;
    this.CountMap = new Map()
  }

  joinQueue(element) {
    this.messageQueue.push(element)
    this.clearRepeat(this.messageQueue, element)
    if (element.trigger === true) this.CountMap.set(element.key, element.timeStamp)
  }

  clearRepeat(mQueue, element) {
    let findSymbol = mQueue.findIndex(item => item.key === element.key)
    if (findSymbol !== -1) {
      if (mQueue[findSymbol].trigger == !element.trigger) {
        mQueue.splice(findSymbol, 1)
        this.clearRepeat(mQueue, element)
        if (element.trigger === false) this.CountMap.set(element.key, element.timeStamp - this.CountMap.get(element.key))
      } else {
        mQueue.pop()
      }
    }
  }

  getMapedTime(key) {
    return this.CountMap.get(key)
  }
}