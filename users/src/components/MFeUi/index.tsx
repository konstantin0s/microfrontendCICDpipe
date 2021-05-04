import React, { useRef, useEffect } from 'react';
// import styled from 'styles/styled-components';
import { MfeUiElement, MFeUiProps } from './types';
import { useScript } from '../../hooks/useScript';
// import NoInfoMessage from 'components/NoInfoMessage';
// import LoadingIndicator from 'components/LoadingIndicator';

const MFeUi = ({
  source,
  sourceConfig,
  mFeUiData,
  webComponentName,
  className,
  showUserError = true,
  errorCode,
}: MFeUiProps & { className?: string }) => {
  useScript(sourceConfig);
  const [loaded, error] = useScript(source);
  const wcRef = useRef<MfeUiElement>(null);
  useEffect(() => {
    const element = wcRef.current;
    if (element) {
      element.reactProps = mFeUiData;
    }
  }, [mFeUiData, wcRef, loaded]);

  const webcompononentContent = () => {
    if (webComponentName) {
      if (loaded && !error) {
        return React.createElement(webComponentName, {
          'ref': wcRef,
          'class': className,
          'data-element': 'mfe-ui',
        });
      } else if (!loaded && !error && showUserError) {
        return <h1>Loading...</h1>;
      } else if (showUserError) {
        return <h1>Error...</h1>;
      } else {
        return null;
      }
    } else {
      return (
       
          <p>No preview available yet</p>
       
      );
    }
  };
  return webcompononentContent();
};
export default MFeUi;