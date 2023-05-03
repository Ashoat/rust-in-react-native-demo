import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly add: (a: number, b: number) => Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeTurboModule',
);
