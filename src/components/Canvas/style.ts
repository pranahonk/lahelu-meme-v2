import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

const canvasSize = SIZES.width - SIZES.padding * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  canvas: {
    width: canvasSize,
    height: canvasSize,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  canvasBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    zIndex: -1, // Ensure it's behind other elements
  },
});

export default styles;
