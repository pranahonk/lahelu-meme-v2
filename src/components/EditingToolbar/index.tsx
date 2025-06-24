import React from 'react';
import {View} from 'react-native';
import ToolbarButton from '../ToolbarButton';
import styles from './style';
import {CanvasElement, TextElement} from '../../types';
import {useEditor} from '../../contexts/EditorContext';

interface EditingToolbarProps {
  selectedElement: CanvasElement | undefined;
  onEditText: () => void;
  onColorPress: () => void;
  onFontPress: () => void;
}

const EditingToolbar = ({
  selectedElement,
  onEditText,
  onColorPress,
  onFontPress,
}: EditingToolbarProps) => {
  const {dispatch} = useEditor();

  const handleDelete = () => {
    if (selectedElement) {
      dispatch({type: 'REMOVE_ELEMENT', payload: {id: selectedElement.id}});
      dispatch({type: 'SELECT_ELEMENT', payload: {id: null}});
    }
  };

  const handleFontSizeChange = (amount: number) => {
    if (selectedElement && 'fontSize' in selectedElement) {
      const currentSize = (selectedElement as TextElement).fontSize;
      const newSize = Math.max(10, currentSize + amount); // Prevent font size from being too small
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: {id: selectedElement.id, data: {fontSize: newSize}},
      });
    }
  };

  return (
    <View style={styles.container}>
      <ToolbarButton
        iconName="color-palette-outline"
        onPress={onColorPress}
        label="Color"
      />
      <ToolbarButton
        iconName="remove-outline"
        onPress={() => handleFontSizeChange(-2)}
      />
      <ToolbarButton
        iconName="add-outline"
        onPress={() => handleFontSizeChange(2)}
      />
      <ToolbarButton
        iconName="text-outline"
        onPress={onEditText}
        label="Edit Text"
      />
      <ToolbarButton
        iconName="options-outline"
        onPress={onFontPress}
        label="Font"
      />
      <ToolbarButton iconName="trash-outline" onPress={handleDelete} />
    </View>
  );
};

export default EditingToolbar;
