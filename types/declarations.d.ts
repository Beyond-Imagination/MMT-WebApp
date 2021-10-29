
declare module '*.svg' {
  import React from 'react';

  const content: React.FC<SvgProps>;
  export default content;
}

declare global {
  interface Window {
    klipSDK: any;
  }
}

let klipSDK = window.klipSDK;
