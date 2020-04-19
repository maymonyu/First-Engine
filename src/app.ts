import {buildTvirim, buildIturim} from './providers/csv-provider';
import {MainFlow} from './modules/main-flow/main-flow';

// buildTvirim();
// buildIturim();
const main = new MainFlow();
main.start();
