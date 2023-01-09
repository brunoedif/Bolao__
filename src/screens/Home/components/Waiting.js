import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { colors, device, fonts } from './consts';

// icons
import SvgTruck from './icons/Svg.Truck';
import {
  BackgroundSecondary,
  Primary,
  Shaddow
} from '../../../components/Colors';
import { Box, Image } from 'native-base';

const Waiting = (props) => (
  <Box borderRadius={20} style={styles.container}>
    <View style={styles.containerBanner}>
      <Text style={styles.bannerText}>Novos serviços</Text>
      <Text style={styles.bannerMuted}>{props.work}</Text>
    </View>

    <View style={styles.containerInput}>
      <View style={styles.containerSquare}>
        <View style={styles.square} />
      </View>
      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.containerIcon}>
        <Image w={8} h={8} alt="" source={props.source} />
      </View>
    </View>
  </Box>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: Shaddow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    top: device.iPhoneNotch ? 144 : 120,
    width: '85%',
    borderRadius: 20,
    backgroundColor: BackgroundSecondary
  },
  containerBanner: {
    backgroundColor: Primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 12
  },
  bannerMuted: {
    color: colors.mint,
    fontFamily: fonts.uberMedium,
    fontSize: 12
  },
  containerInput: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 48,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  },
  containerSquare: {
    alignItems: 'center',
    flex: 2
  },
  square: {
    backgroundColor: Primary,
    height: 8,
    width: 8,
    borderRadius: 10
  },
  text: {
    color: colors.greyAbbey,
    flex: 8,
    fontFamily: fonts.uberMedium,
    fontSize: 20
  },
  containerIcon: {
    alignItems: 'center',
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    flex: 2
  }
});

export default Waiting;
