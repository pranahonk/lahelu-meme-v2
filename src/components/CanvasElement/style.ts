import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  selected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  resizeHandle: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    borderWidth: 2,
    borderColor: 'white',
    elevation: 5, // for Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default styles;
