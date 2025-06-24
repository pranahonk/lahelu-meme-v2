import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.padding / 2,
    backgroundColor: COLORS.surface,
  },
  itemContainer: {
    marginHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: COLORS.primary,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default styles;
