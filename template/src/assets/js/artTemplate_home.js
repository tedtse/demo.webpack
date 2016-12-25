require('../css/style.css');
var template = require('art-template');
var tpl = require('../tpl/art_template_data.tpl');
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
var render = template.compile(tpl);
document.querySelector('article ul').innerHTML = render({data, data});

