import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import styles from './style';

type FloatingActionButtonProps = TouchableOpacityProps & {
  iconName: string;
};

const FloatingActionButton = ({
  iconName,
  ...props
}: FloatingActionButtonProps): React.JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Icon name={iconName} size={30} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
