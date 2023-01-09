import * as React from 'react';

import { Text, View } from 'react-native';

// components
import ModalHeader from '../components/ModalHeader';
import { gStyle } from './consts';

const ModalTutorialBike = () => (
  <View style={gStyle.container}>
    <ModalHeader text="Tutorial Bike" />

    <View style={gStyle.p24}>
      <Text>ModalTutorialBike</Text>
    </View>
  </View>
);

export default ModalTutorialBike;
