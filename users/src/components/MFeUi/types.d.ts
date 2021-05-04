import { Task } from 'containers/Tasks/types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mfe-ui': any;
      'mfe-inbox-fallback': any;
    }
  }
}

export interface MFeUiProps {
  readonly source: string;
  readonly sourceConfig: string;
  readonly mFeUiData: SharedData | any;
  readonly webComponentName?: string;
  readonly showUserError?: boolean;
  readonly errorCode?: string;
}

// TODO: clean typings for MFEs
export interface MfeUiElement extends Element {
  reactProps: SharedData | any;
}

export interface SharedData {
  userId: number;
  sharedActions: any;
}
