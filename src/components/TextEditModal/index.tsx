import React, { useState, useEffect } from 'react';
import { View, TextInput, Modal, Button, StyleSheet } from 'react-native';
import styles from './style';

interface TextEditModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialText: string;
}

const TextEditModal = ({ isVisible, onClose, onSave, initialText }: TextEditModalProps) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            autoFocus
            multiline
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="#EF4444" />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TextEditModal;
