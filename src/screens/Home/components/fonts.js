import device from './device';

export default {
  uberBold: 'uberBold',
  uberMedium: 'uberMedium',
  uberRegular: 'uberRegular',
  roboto: 'roboto',
  robotoMedium: 'robotoMedium',
  robotoBold: 'robotoBold',

  bold: device.iOS ? 'HelveticaNeue-Bold' : 'sans-serif-condensed',
  light: device.iOS ? 'HelveticaNeue-Light' : 'sans-serif-light',
  medium: device.iOS ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
  regular: device.iOS ? 'HelveticaNeue' : 'sans-serif'
};
