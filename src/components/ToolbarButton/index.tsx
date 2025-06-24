import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

interface ToolbarButtonProps {
  iconName: string;
  onPress: () => void;
  label?: string;
}

const ToolbarButton = ({ iconName, onPress, label }: ToolbarButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} style={styles.icon} />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default ToolbarButton;
