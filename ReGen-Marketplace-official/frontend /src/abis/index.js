import ProductPassport from './ProductPassport.json';
import AccessControl from './AccessControl.json';
import GreenPoints from './GreenPoints.json';
import LifecycleEvent from './LifecycleEvent.json';

export const CONTRACT_ABIS = {
  ProductPassport: ProductPassport.abi,
  AccessControl: AccessControl.abi,
  GreenPoints: GreenPoints.abi,
  LifecycleEvent: LifecycleEvent.abi,
};

export default CONTRACT_ABIS;
