function cb (val) {
    console.log("视图更新了")
}

function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            return val
        },
        set: function reactiveSetter (newVal) {
            if(newVal === val) {
                console.log("一样的值")
                return;
            }
            cb()
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
    }
}

let o = new Vue({
    data: {
        test: "I am test."
    }
})

o._data.test = "hello world."
console.log(o._data.test)