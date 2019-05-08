# 装饰器在Taro项目中的实际使用场景

## 最初有一个拦截登陆的需求，可以这样写（这样写会有问题，后面会讲）
``` ts
// withLogin.ts
/**
 * checkLogin 检查登陆状态 返回boolean
 * toLogin 会调自动登录接口，返回Promise，是异步的
 * inEnv 是为了更方便判断Taro多端环境封装的函数
 * warn 是console.warn的封装
 */
import { checkLogin, toLogin, inEnv, warn } from '@/utils'

function withLogin (...args: string[]) {
  return function (Component) {
    // 兼容异常 toLogin登陆逻辑为小程序独有
    if (!inEnv('weapp') || !args.length) return Component
    return class extends Component {
      constructor(props) {
        super(props)
        for (let key of args) {
          if (typeof super[key] !== 'function') continue
          // 未登录时自动登录后异步执行方法
          this[key] = async () => {
            if (!checkLogin()) {
              await toLogin()
              if (!checkLogin()) return
            }
            super[key]()
          }
        }
      }
    }
  }
}
export default withLogin
```

## 然后又想加一个拦截位置权限的装饰器
``` ts
// withLocation.ts
/**
 * checkWxAuth 检查授权状态 返回boolean
 * openSetting 封装Taro.openSetting打开设置页，返回Promise，是异步的
 */
import { checkWxAuth, openSetting, inEnv, warn } from '@/utils'

function withLocation (...args: string[]) {
  return function (Component) {
    // 兼容异常
    if (!inEnv('weapp') || !args.length) return Component
    return class extends Component {
      constructor(props) {
        super(props)
        for (let key of args) {
          if (typeof super[key] !== 'function') continue
          // 未授权地理位置时自动跳转到设置页,如果从设置页返回后授权成功则继续执行原函数
          this[key] = async () => {
            if (!checkWxAuth('userLocation')) {
              await openSetting()
              if (!checkWxAuth('userLocation')) return
            }
            super[key]()
          }
        }
      }
    }
  }
}
export default withLocation
```

## 两个装饰器只有super[key]()之前的几行逻辑不同，因此可以封装一个函数来创建这类装饰器，并且之前两个装饰器都会把函数改成异步执行，我们可以兼容一下同步函数
``` ts
// @/decorator/generate.ts
import { inEnv, warn, log } from '@/utils'

/**
* 创造类装饰器
* @param {Function} beforeContinue 必须返回true才能继续执行被代理的函数
* @param {Boolean} isAsync 默认异步执行 (babel处理过的async函数constructor.name不再是AsyncFunction,所以手动传参区分)
* @return {Function} 返回一个装饰器函数，接收参数为被代理的函数名
*/
function genDecorator (beforeContinue: Function, isAsync = true) {
  return function (...args: string[]) {
    return function (Component) {
      // 仅用于微信小程序 兼容异常
      if (!inEnv('weapp') || !args.length || !beforeContinue) return Component
      return class extends Component {
        constructor(props) {
          super(props)
          for (let key of args) {
            const oldFn = super[key]
            if (typeof oldFn !== 'function') continue
            this[key] = isAsync ? (async function () {
              if (await beforeContinue()) oldFn()
            }) : (function () {
              if (beforeContinue()) oldFn()
            })
          }
        }
      }
    }
  }
}
export default genDecorator
```
``` ts
// @/decorator/index.ts
import genDecorator from '@/decorator/generate'
import { checkLogin, toLogin, openSetting, checkWxAuth, log } from '@/utils'

// 未登陆则自动登陆
export const withLogin = genDecorator(async () => {
  log('withLogin')
  if (checkLogin()) return true
  await toLogin()
  return checkLogin()
})

// 无位置权限则打开设置页
export const withLocation = genDecorator(async () => {
  log('withLocation')
  if (checkWxAuth()) return true
  await openSetting()
  return checkWxAuth()
})

// 同步函数
export const logSomething = genDecorator(() => {
  log('logSomething')
  return true
}, false)
```

## 然后装饰器就可以使用了，但是当我们叠加使用的时候，是希望两个装饰器的拦截代码都能生效，而实际上只有最上面的装饰器会生效
``` ts
// @/pages/index.tsx

import { withLogin, logSomething } from '@/decorator'
// ...
@logSomething('doSomething')
@withLogin('doSomething')
class Index extends Component {
  componentDidShow () {
    this.doSomething()
  }
  doSomething () {}
}
// ...

/**
 * 最终打印
 * logSomething
 */
```

## 换一下顺序
``` ts
// @/pages/index.tsx

import { withLogin, logSomething } from '@/decorator'
// ...
@withLogin('doSomething', 'withLogin')
@logSomething('doSomething', 'logSomething')
class Index extends Component {
  componentDidShow () {
    this.doSomething()
  }
  doSomething () {}
}
// ...

/**
 * 最终打印
 * withLogin
 */
```

## 要解释这种现象，首先需要知道上面这个例子中装饰器叠加时各个函数的运行时机，然后需要了解super的知识
``` ts
// 执行: 1. @/decorator/index.ts中调用genDecorator函数时执行
function genDecorator (beforeContinue: Function, isAsync = true) {
  // 执行: 2. 这里return的function就是装饰器，使用装饰器时是从上往下执行的，先是执行@withLogin('doSomething', 'withLogin')，然后执行@logSomething('doSomething', 'logSomething')，我们可以通过打印传入的第二个参数来验证，先打印了1 withLogin，然后是1 logSomething
  return function (...args: string[]) {
    log(1, args[1])
    // 执行: 3. 这里return的function执行时机刚好相反，是由下往上执行的，同样可以打印来验证
    return function (Component) {
      log(2, args[1])
      if (!inEnv('weapp') || !args.length || !beforeContinue) return Component
      // 注意: 1. 最后返回一个新的class。 也就是withLogin返回的函数执行时，Component是logTime返回的函数返回的新class
      return class extends Component {
        constructor(props) {
          super(props)
          for (let key of args) {
            const oldFn = super[key]
            if (typeof oldFn !== 'function') continue
            // 执行: 4. componentDidShow中this.doSomething()执行的是这里包装后的函数this[key]
            // 注意: 2. 这里把包装后的函数赋值给this[key]，包装后的方法并不能被继承，如果赋值给super[key]也等同于this[key]
            this[key] = isAsync ? (async function () {
              // 注意: 3. 这里的oldFn是super[key]，也就是永远都取的是Component.prototype[key]，所以之前的包装都丢弃了
              if (await beforeContinue()) oldFn()
            }) : (function () {
              if (beforeContinue()) oldFn()
            })
          }
        }
      }
    }
  }
}
```

## 所以我们把包装后的函数赋值给Component.prototype[key]就可以解决了，修改后的代码如下
``` ts
function genDecorator (beforeContinue: Function, isAsync = true) {
  return function (...args: string[]) {
    return function (Component) {
      // 仅用于微信小程序 兼容异常
      if (!inEnv('weapp') || !args.length || !beforeContinue) return Component
      return class extends Component {
        constructor(props) {
          super(props)
          for (let key of args) {
            const oldFn = super[key]
            if (typeof oldFn !== 'function') {
              warn(`${Component.name}.prototype找不到${key}函数(class中定义的箭头函数会是undefined)`)
              continue
            }
            Component.prototype[key] = isAsync ? (async () => {
              if (await beforeContinue()) oldFn()
            }) : (() => {
              if (beforeContinue()) oldFn()
            })
          }
        }
      }
    }
  }
}
```
