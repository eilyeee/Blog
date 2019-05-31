const { readFile, readFileSync } = require('fs')

setImmediate(() => console.log('[阶段3.immediate] immediate 回调1'))
setImmediate(() => console.log('[阶段3.immediate] immediate 回调2'))
setImmediate(() => console.log('[阶段3.immediate] immediate 回调3'))

Promise.resolve().then(() => {
  console.log("[……待切入下一阶段] promise 回调1")

  setImmediate(() => console.log('[阶段3.immediate] promise 回调1增加的immediate 回调4'))

})

readFile('../README.md', 'utf-8', data => {
  console.log('[阶段2……IO 回调] 读文件回调1')
  readFile('../SecretsoftheJavaScriptNinja2ndEdition.pdf', 'utf-8', data => {
    console.log('[阶段2……IO 回调] 读文件回调2')
    setImmediate(() => console.log('[阶段3.immediate] 读文件回调2 回调1增加的immediate 回调4'))
  })
  setImmediate(() => {
    console.log('[阶段3.immediate] immediate 回调4')
    Promise.resolve().then(() => {
      console.log("[……待切入下一阶段] promise 回调2")
      process.nextTick(() => console.log('[……待切入下一阶段] promise 回调2 增加的nextTick 回调5'))
    }).then(() => {
      console.log("[……待切入下一阶段] promise 回调3")
    })
  })
  setImmediate(() => {
    console.log('[阶段3.immediate] immediate 回调5')
    process.nextTick(() => console.log('[……待切入下一阶段] immediate 回调5 增加的nextTick 回调6'))
    console.log('[……待切入下一阶段] 正在同步读取一个大文件')
    const pdf = readFileSync('SecretsoftheJavaScriptNinja2ndEdition.pdf', 'utf-8')
    process.nextTick(() => console.log('[……待切入下一阶段] immediate 回调5 增加的nextTick 回调7'))

    readFile("../README.md", 'utf-8', data => {
      console.log('[阶段2……IO 回调] 读文件回调2')
      setImmediate(() => console.log('[阶段3.immediate] 读文件回调2 增加的immediate 回调6'))
      setTimeout(() => {
        console.log("[阶段3.immediate] 读文件回调2  定时器 回调8")
      }, 0);
    })
  })
  process.nextTick(() => console.log('[……待切入下一阶段] 读文件回调2 增加的nextTick 回调6'))
  setTimeout(() => console.log("[阶段1……定时器] 定时器 回调6"), 0)
  setTimeout(() => console.log("[阶段1……定时器] 定时器 回调7"), 0)
})

setTimeout(() => console.log("[阶段1……定时器] 定时器 回调1"), 0)
setTimeout(() => {
  console.log("[阶段1……定时器] 定时器 回调2")

  process.nextTick(() => {
    console.log("[……待切入下一个阶段] nextTick")
  })
}, 0)
setTimeout(() => console.log("[阶段1……定时器] 定时器 回调3"), 0)
setTimeout(() => console.log("[阶段1……定时器] 定时器 回调4"), 0)

process.nextTick(() => {
  console.log("[……待切入下一个阶段] nextTick 回调1")
})

process.nextTick(() => {
  console.log("[……待切入下一个阶段] nextTick 回调2")
  process.nextTick(() => {
    console.log("[……待切入下一个阶段] nextTick 回调4")
  })
})
process.nextTick(() => {
  console.log("[……待切入下一个阶段] nextTick 回调3")
})
