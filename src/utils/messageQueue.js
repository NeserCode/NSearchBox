export class messageQueue {

  /*
  *   {
  *     trigger: Boolean, 
  *     key: String | Number
  *   }
  */

  constructor(messArr) {
    this.messageQueue = new Map(messArr)
    this.counterMap = new Map()
  }

  joinQueue(element) {
    if (element.trigger !== true) return false
    else this.messageQueue.set(element.key, element.trigger)

    if (element.key === 'Backspace' && element.trigger === true) {
      if (this.counterMap.get('Backspace') === undefined)
        this.counterMap.set('Backspace', 'press')
      else if (this.counterMap.get('Backspace') === 'press')
        this.counterMap.set('Backspace', 'hold')
    }
  }

  quitQueue(element) {
    if (element.trigger !== false) return false
    else
      if (this.messageQueue.get(element.key) === !element.trigger)
        this.messageQueue.delete(element.key)


    if (element.key === 'Backspace' && element.trigger === false) {
      console.log(this.counterMap.get('Backspace'));
      this.counterMap.delete('Backspace')
    }
  }
}