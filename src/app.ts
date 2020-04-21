import {MainFlow} from './modules/main-flow';

const main = new MainFlow();
main.start().then(() => console.log('finished'));
