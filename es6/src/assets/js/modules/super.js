export default class Super {
    constructor (id) {
        this.id = id;
    }
    get prop () {
        return 'getter';
    }
    set prop (value) {
        console.log('setter: ' + value);
    }
}