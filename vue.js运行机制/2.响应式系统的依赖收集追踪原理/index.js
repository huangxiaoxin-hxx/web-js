// 订阅者
class Dep {
    constructor() {
        // 用来存放Watcher对象的数组
        this.subs = [];
    }
    // 在subs中存放一个watcher对象
    addSub(sub) {
        this.subs.push(sub);
    }
    // 通知所有Watcher对象更新视图
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}


// 观察者
class Watcher {
    constructor() {
        // 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到
        Dep.target = this
    }

    update() {
        console.log("视图更新啦")
    }
}

Dep.target = null;

function defineReactive(obj, key, val) {

    const dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            dep.addSub(Dep.target)
            return val
        },
        set: function reactiveSetter (newVal) {
            if(newVal === val) {
                console.log("一样的值")
                return;
            }
            dep.notify()
            val = newVal
        }
    })
}

function observe (value) {
    if(!value || (typeof value !== "object")) {
        return;
    }

    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key])
    })
}

class Vue {
    constructor(options) {
        this._data = options.data
        observe(this._data)
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher()
        /* 在这里模拟render的过程，为了触发test属性的get函数 */
        console.log('render~', this._data.test)
    }
}

let globalObj = {
    text1: 'text1'
};

let o1 = new Vue({
    template:
        `<div>
            <span>{{text1}}</span> 
        <div>`,
    data: globalObj
});

let o2 = new Vue({
    template:
        `<div>
            <span>{{text1}}</span> 
        <div>`,
    data: globalObj
});

globalObj.text1 = 'hello,text1';