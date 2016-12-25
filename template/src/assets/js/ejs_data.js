require('ejs');
require('../css/style.css');
var tpl = require('../tpl/ejs_data.tpl');

// var people = ['geddy', 'neil', 'alex'],
    // html = ejs.render('<%= people.join(", "); %>', {people: people});
// var template = ejs.compile('<%= people.join(", "); %>');

var data = [
    {
        title: 'The Data'
    },
    {
        title: 'The Template'
    },
    {
        title: 'The Result'
    }
];
var html = ejs.render(tpl, {data, data});
document.querySelector('article ul').innerHTML = html;


