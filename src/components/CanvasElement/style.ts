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
});

export default styles;
