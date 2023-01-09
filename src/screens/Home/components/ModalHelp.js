import * as React from 'react';

import { Text, View } from 'react-native';

// components
import ModalHeader from '../components/ModalHeader';
import { gStyle } from './consts';

const ModalHelp = () => (
  <View style={gStyle.container}>
    <ModalHeader text="Help" />

    <View style={gStyle.p24}>
      <Text>ModalHelp</Text>
    </View>
  </View>
);

export default ModalHelp;
