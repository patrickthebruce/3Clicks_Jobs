import React from 'react';

import {AuthenticatedUserProvider}  from './AuthenticatedUserProvider';
import RootNavigator from './RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
/**
 * Wrap all providers here
 */

export default function Routes() {
  return (
    // <PaperProvider>
      <AuthenticatedUserProvider>
          <RootNavigator />
      </AuthenticatedUserProvider>
    // </PaperProvider>
    
  );
}

