require('../css/style.css');
var tpl = require('../tpl/underscore_data.tpl');
// var _ = require('underscore');

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
var template = _.template(tpl);
document.querySelector('article ul').innerHTML = template({data, data});