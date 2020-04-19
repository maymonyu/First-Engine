import {buildRules} from '../providers/csv-provider';
import {Rule} from '../types/rule';

export function createConstitution() {
  const rules: Array<Rule> = [{key: 'high,medium,0_to_1,1', value: 'medium,medium'}];
  const constitution = new Map<string, string>();

  for (const rule of rules) {
    constitution.set(rule.key, rule.value);
  }

  console.log(constitution);
}
