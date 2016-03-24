module.exports = 'It works from content.js';

console.log('hello');

const a = {
    hello: 'aaa',
    hello() {
        console.log('bbb')
    }
}

const {hello} = a;
console.log(hello);

a.hello()


const asdas = () => {
    console.log('aaa')
};