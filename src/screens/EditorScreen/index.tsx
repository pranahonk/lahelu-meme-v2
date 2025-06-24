import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from './style';
import Canvas from '../../components/Canvas';
import TemplatePicker from '../../components/TemplatePicker';
import FloatingActionButton from '../../components/FloatingActionButton';
import { TEMPLATES } from '../../constants/templates';
import { MemeTemplate, TextElement } from '../../types';
import { useEditor } from '../../contexts/EditorContext';
import { COLORS } from '../../constants';

const EditorScreen = (): React.JSX.Element => {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const { dispatch } = useEditor();

  const addTextElement = () => {
    const newTextElement: TextElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: 'Hello World',
      x: 50,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
      isSelected: false,
      color: COLORS.white,
      fontSize: 24,
      fontFamily: 'System',
    };
    dispatch({ type: 'ADD_ELEMENT', payload: newTextElement });
  };

  const handleAddPress = () => {
    Alert.alert('Add Element', 'What would you like to add?', [
      {
        text: 'Text',
        onPress: addTextElement,
      },
      {
        text: 'Image',
        onPress: () => console.log('Add Image Pressed'), // To be implemented
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Canvas backgroundImage={selectedTemplate?.image} />
      <TemplatePicker
        templates={TEMPLATES}
        selectedTemplateId={selectedTemplate?.id}
        onSelectTemplate={setSelectedTemplate}
      />
      <FloatingActionButton iconName="add-outline" onPress={handleAddPress} />
    </View>
  );
};

export default EditorScreen;
