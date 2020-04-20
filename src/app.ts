import {MainFlow} from './modules/main-flow/main-flow';

// buildTvirim();
// buildIturim();
const main = new MainFlow();
main.start();

export function sum(a: number, b: number): number {
  return a + b;
}
