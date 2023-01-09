import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';

import { Switch, Linking, StyleSheet, View, Platform } from 'react-native';
import { gStyle } from './components/consts';
import { Avatar, Box, Button, HStack, Input, Modal, Text } from 'native-base';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
// components
import RequestRideType from './components/RequestRideType';
import SelectRideType from './components/SelectRideType';
// icons
import SvgCheckShield from './components/icons/Svg.CheckShield';
import SvgMenu from './components/icons/Svg.Menu';
import SvgQRCode from './components/icons/Svg.QRCode';
import TouchIcon from './components/TouchIcon';
import TouchText from './components/TouchText';
import {
  Primary,
  BackgroundSecondary,
  TextTertiary,
  Border
} from '../../components/Colors';
import Waiting from './components/Waiting';
import styles from './styles';

import Pending from './components/Pending';

export default function Home(navigation) {
  function Disponibility() {
    setWork((prevState) => !prevState);
  }
  const on = require('../../../assets/images/search.gif');
  const off = require('../../../assets/images/erro.gif');
  const [status, setStatus] = useState(true);
  const [work, setWork] = useState(true);
  const types = {
    car: {
      image: 'carSm',
      imageLg: 'carLg',
      text: 'Caminhão'
    },
    bike: {
      image: 'bikeSm',
      imageLg: 'bikeLg',
      text: 'Moto'
    }
  };
  const { PROVIDER_GOOGLE } = MapView;
  const [type, setType] = useState('car');
  const [selectType, setSelectType] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: null, lon: null });

  useEffect(() => {
    const getLocation = async () => {
      // get exisiting locaton permissions first
      const { status: existingStatus } =
        await Location.requestForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      // ask again to grant locaton permissions (if not already allowed)
      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      // still not allowed to use location?
      if (finalStatus !== 'granted') {
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();

      setCoords({ lat: coords.latitude, lon: coords.longitude });
      setShowMap(true);
    };

    getLocation().catch(console.error);
  }, []);

  return (
    <View style={gStyle.container}>
      {showMap && (
        <MapView
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          showsUserLocation
          style={styles.map}
        />
      )}

      {!showMap && (
        <View style={styles.containerNoLocation}>
          <Text style={styles.textLocationNeeded}>
            Precisamos dos dados de sua localização...
          </Text>
          <TouchText
            onPress={() => Linking.openURL('app-settings:')}
            style={styles.btnGoTo}
            styleText={styles.btnGoToText}
            text="Vá até as configurações"
          />
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.icons}>
          <TouchIcon
            icon={<SvgQRCode />}
            iconSize={20}
            onPress={() => navigation.navigate('ModalQRCode')}
            style={[styles.icon, styles.iconQRCode]}
          />
          <TouchIcon
            icon={<SvgCheckShield />}
            iconSize={20}
            onPress={() => navigation.navigate('ModalTutorialBike')}
            style={[styles.icon, styles.iconShield]}
          />
        </View>
      </View>

      <View style={styles.header}>
        <HStack
          paddingX={2}
          paddingY={Platform.OS === 'ios' ? 2 : 0}
          backgroundColor={BackgroundSecondary}
          alignItems="center"
          justifyContent="space-between"
          width={'35%'}
          borderRadius={15}
          shadowColor={'#000'}
          shadowOffset={{
            width: 0,
            height: 1
          }}
          shadowOpacity={0.2}
          shadowRadius={1.41}
          elevation={2}
        >
          <Text fontWeight={'bold'} color={TextTertiary}>
            Online
          </Text>
          <Switch value={work} onValueChange={Disponibility} />
        </HStack>

        <View style={styles.placeholder} />

        <TouchText
          onPress={() => navigation.navigate('ModalHelp')}
          style={styles.help}
          text="Help"
        />
      </View>

      {status == true && work ? <Pending /> : <></>}
      {status == false ? (
        <Waiting
          text={work ? 'Buscando serviços' : 'Você está offline'}
          work={work ? 'Online' : 'Offline'}
          source={on}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

Home.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};
