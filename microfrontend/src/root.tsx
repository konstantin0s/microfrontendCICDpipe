import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import App from './containers/App';
import _ from 'lodash';

import { Provider } from 'react-redux';
import { create, Jss } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import configureStore from './configureStore';
import { ThemeProvider, StyleSheetManager } from './styles/styled-components';
import { theme } from './styles/theme';
import 'sanitize.css/sanitize.css';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { MFE_UI_NAMESPACE } from './variables';
import { SharedData } from './containers/App/types';

const initialState = {};
const { store } = configureStore(initialState);

export default class Root extends Component<SharedData> {
  engine: Styletron;
  target!: HTMLElement;
  jss: Jss;

  constructor(props) {
    super(props);

    const { target } = props;
    this.target = target;

    // Injects Material UI related styles
    const styleNode = document.createComment('jss-insertion-point');
    this.jss = create({
      ...jssPreset(),
      insertionPoint: this.target.appendChild(styleNode),
    });

    // Injects Styletron related styles
    this.engine = new Styletron({
      prefix: `${MFE_UI_NAMESPACE}_`,
      container: this.target,
    });
  }

  noProxyProps() {
    return _.cloneDeep(this.props);
  }

  render() {
    return (
      <div id={MFE_UI_NAMESPACE}>
        <StyleSheetManager target={this.target}>
          <StylesProvider jss={this.jss}>
            <Provider store={store}>
              <StyletronProvider value={this.engine}>
                <ThemeProvider theme={theme}>
                  <App {...this.noProxyProps()} />
                </ThemeProvider>
              </StyletronProvider>
            </Provider>
          </StylesProvider>
        </StyleSheetManager>
      </div>
    );
  }
}
