import {MainFlow} from './modules/main-flow';

const main = new MainFlow();
main.start().then(() => console.log('finished'));

export function sum(a: number, b: number): number {
    return a + b;
}
