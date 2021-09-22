/// <reference types="@sabertazimi/react-scripts" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      header: string;
      body: string;
      footer: string;
    };
  }
}
