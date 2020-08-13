// import {createElement} from './element'

let vertualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['aaa']),
    createElement('li', {class: 'item'}, ['bbb']),
    createElement('li', {class: 'item'}, ['ccc']),
])

console.log(vertualDom)