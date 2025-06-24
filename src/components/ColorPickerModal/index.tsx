import React from 'react';
import { View, Modal, Button } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import styles from './style';

interface ColorPickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
  initialColor: string;
}

const ColorPickerModal = ({ isVisible, onClose, onSelectColor, initialColor }: ColorPickerModalProps) => {
  let pickerRef: ColorPicker | null = null;

  const handleSelect = () => {
    if (pickerRef) {
      // The onColorChange event on the picker itself provides the color directly.
      // This is a common pattern, but let's assume we need a button to confirm.
      // pickerRef.revert() is also available if needed.
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <ColorPicker
            ref={(r) => (pickerRef = r)}
            color={initialColor}
            onColorChangeComplete={onSelectColor}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
          <Button title="Done" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ColorPickerModal;
