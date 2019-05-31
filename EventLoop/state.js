const { readFile } = require("fs")
const EventEmitter = require("events")

class E extends EventEmitter { }

const Y = new E()

Y.on("event", () => {
  console.log("粗大事了")
})

setTimeout(() => {
  console.log('0 毫秒到期后执行的定时器函数')
}, 0);

setTimeout(() => {
  console.log('100 毫秒到期后执行的定时器函数')
}, 100);

setTimeout(() => {
  console.log('200 毫秒到期后执行的定时器函数')
}, 200);

readFile('../README.md', 'utf-8', data => {
  console.log('完成文件 1 读操作的回调')
})

readFile('../README.md', 'utf-8', data => {
  console.log('完成文件 2 读操作的回调')
})

process.nextTick(() => {
  console.log("process.nextTick 的回调")
})

Promise.resolve()
  .then(() => {
    Y.emit("event")

    process.nextTick(() => {
      console.log("process.nextTick 的第 2 次回调")
    })

    console.log("Promise 的第 1 次回调")
  })
  .then(() => {
    console.log('Promise 的第 2 次回调')
  })
