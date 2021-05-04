import { wrapReactComponent } from './utils/WcUtils';
import { MFE_UI_NAMESPACE } from './variables';
import Root from './root';

// Init Custom Element (Web component)
wrapReactComponent(MFE_UI_NAMESPACE, Root, undefined, []);
