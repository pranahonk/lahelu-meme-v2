import React from 'react';
import { View, Modal, FlatList, Text, TouchableOpacity } from 'react-native';
import { FONT_FAMILIES } from '../../constants';
import styles from './style';

interface FontPickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectFont: (font: string) => void;
}

const FontPickerModal = ({ isVisible, onClose, onSelectFont }: FontPickerModalProps) => {
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onSelectFont(item)}>
      <Text style={[styles.itemText, { fontFamily: item }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <FlatList
            data={FONT_FAMILIES}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FontPickerModal;
