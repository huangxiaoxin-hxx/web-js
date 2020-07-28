const empty = document.querySelector('div.empty');
const h1 = document.querySelector('h1');
const right = document.querySelector('div.right')
let name;

document.addEventListener('dragend', (e) => {
    e.target.style.border = 'none'
    empty.style.border = 'none'
    h1.innerHTML = '拖动你喜欢的图案到衣服上';
    h1.style.color = 'black'
})
document.addEventListener('drag', (e) => {
    e.target.style.border = '5px dashed red'
    empty.style.border = '5px dashed red'
})
document.addEventListener('dragstart', (e) => {
    console.log(e.target.alt)
    name = e.target.alt
})
empty.addEventListener('dragenter', (e) => {
    if(empty.firstChild) {
        right.appendChild(empty.firstChild)
        empty.removeChild(empty.firstChild)
    }   
    h1.innerHTML = name;
    h1.style.color = 'red'
})
empty.addEventListener('dragover', (e) => {
    e.preventDefault();
})
empty.addEventListener('drop', (e) => {
    e.preventDefault();
    empty.appendChild(document.querySelector(`img[alt=${name}]`))
},false)
