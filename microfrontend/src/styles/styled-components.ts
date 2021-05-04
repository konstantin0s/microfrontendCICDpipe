import * as styledComponents from 'styled-components';
import { ThemeInterface } from '../types/styles';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  StyleSheetManager,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export { css, createGlobalStyle, keyframes, ThemeProvider, StyleSheetManager };
export default styled;
