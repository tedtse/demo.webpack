import math from './modules/math';
import dialog from './modules/dialog';
import Sub from './modules/sub';

const ONE = 1;
var sub = new Sub();
sub.prop = 123;
dialog.alert(math.add(ONE, 2));