import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: SIZES.base,
  },
  icon: {
    fontSize: 24,
    color: COLORS.text,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
