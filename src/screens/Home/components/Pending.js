import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import {
  Avatar,
  Box,
  Text,
  Button,
  HStack,
  Input,
  VStack,
  Image
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import { colors, device, fonts } from './consts';
import { useNavigation } from '@react-navigation/native';
import {
  BackgroundSecondary,
  Primary,
  TextTertiary,
  TextTitle
} from '../../../components/Colors';

export default function Pending() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <VStack
        bgColor={'#fff'}
        space={2}
        borderRadius={20}
        justifyContent={'space-between'}
        paddingY={4}
        shadowColor={'#000'}
        shadowOffset={{
          width: 0,
          height: 1
        }}
        shadowOpacity={0.2}
        shadowRadius={1.41}
        elevation={2}
      >
        <HStack justifyContent={'space-around'}>
          <HStack space={2}>
            <Image
              alt=""
              backgroundColor={'#fff'}
              borderWidth={1}
              borderRadius={20}
              borderColor={colors.blue}
              size="sm"
              source={{
                uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=696'
              }}
            />
            <Box justifyContent={'center'}>
              <Text style={styles.title}>Brendo Rutherles</Text>
              <Text color={Primary}>Frete carreto</Text>
            </Box>
          </HStack>
          <Box justifyContent={'center'}>
            <Text style={styles.title}>R$18,45</Text>
            <Text textAlign={'center'} color={Primary}>
              1.6 KM
            </Text>
          </Box>
        </HStack>

        <HStack
          px={2}
          w={'100%'}
          alignSelf={'center'}
          alignItems={'flex-start'}
        >
          <MaterialIcons
            style={{ paddingTop: 15 }}
            name="location-on"
            size={24}
            color={colors.blue}
          />
          <Box w={'100%'}>
            <Text
              style={{
                textAlign: 'left',
                paddingHorizontal: 10,
                color: TextTertiary,
                fontSize: 12
              }}
            >
              Origem
            </Text>
            <Input
              isDisabled={true}
              fontSize={16}
              paddingLeft={'10px'}
              variant={'underlined'}
              w={'77.7%'}
              value={'Rua dois'}
            />
          </Box>
        </HStack>

        <HStack
          px={2}
          w={'100%'}
          alignSelf={'center'}
          alignItems={'flex-start'}
        >
          <Feather
            style={{ paddingTop: 15 }}
            name="arrow-down"
            size={24}
            color={colors.blue}
          />
          <Box w={'100%'}>
            <Text
              style={{
                textAlign: 'left',
                paddingHorizontal: 10,
                color: TextTertiary,
                fontSize: 12
              }}
            >
              Destino
            </Text>
            <Input
              isDisabled={true}
              fontSize={16}
              paddingLeft={'10px'}
              variant={'underlined'}
              w={'77.7%'}
              value={'River shopping'}
            />
          </Box>
        </HStack>

        <HStack py={2} justifyContent={'center'} alignItems="center" space={4}>
          <Button
            borderRadius={10}
            onPress={() => navigation.navigate('Detalhes')}
            bgColor={BackgroundSecondary}
            borderColor={Primary}
            borderWidth={2}
            justifyContent={'center'}
            w={'45%'}
            h={'45px'}
            _text={{ color: Primary, fontWeight: 'bold' }}
          >
            Detalhes
          </Button>
          <Button
            w={'45%'}
            h={'45px'}
            borderRadius={10}
            borderWidth={2}
            borderColor={Primary}
            backgroundColor={Primary}
            _text={{ color: BackgroundSecondary, fontWeight: 'bold' }}
          >
            Aceitar Serviço
          </Button>
        </HStack>
      </VStack>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    position: 'absolute',
    padding: 20,
    bottom: '10%',
    left: 0,
    right: 0,
    borderRadius: 10
  },
  containerCard: {
    backgroundColor: colors.green,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 12
  },
  bannerMuted: {
    color: colors.greyAbbey,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    width: '45%',
    borderRadius: 10,
    backgroundColor: Primary,
    borderColor: Primary,
    borderWidth: 2
  },
  containerInput: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 48
  },
  containerSquare: {
    alignItems: 'center',
    flex: 1
  },
  square: {
    backgroundColor: colors.black,
    height: 8,
    width: 8
  },
  text: {
    color: colors.greyAbbey,
    flex: 2,
    fontFamily: fonts.uberMedium,
    fontSize: 19
  },

  title: {
    color: TextTitle,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    fontWeight: 'bold'
  },
  containerIcon: {
    alignItems: 'center',
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    borderRadius: 1,
    flex: 2,
    marginBottom: 1
  }
});
