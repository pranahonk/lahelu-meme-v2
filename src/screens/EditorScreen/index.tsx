import React, { useState } from 'react';
import { View, Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './style';
import Canvas from '../../components/Canvas';
import TemplatePicker from '../../components/TemplatePicker';
import FloatingActionButton from '../../components/FloatingActionButton';
import EditingToolbar from '../../components/EditingToolbar';
import TextEditModal from '../../components/TextEditModal';
import ColorPickerModal from '../../components/ColorPickerModal';
import FontPickerModal from '../../components/FontPickerModal';
import { TEMPLATES } from '../../constants/templates';
import { MemeTemplate, TextElement, ImageElement } from '../../types';
import { useEditor } from '../../contexts/EditorContext';
import { COLORS } from '../../constants';

import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const EditorScreen = (): React.JSX.Element => {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [isTextEditModalVisible, setIsTextEditModalVisible] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isFontPickerVisible, setIsFontPickerVisible] = useState(false);
  const { state, dispatch } = useEditor();
  const selectedElement = state.elements.find((el) => el.id === state.selectedElementId) as TextElement | undefined;

  const addImageElement = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission = Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to select images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission is required to add images.');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        const newImageElement: ImageElement = {
          id: `image-${Date.now()}`,
          type: 'image',
          uri: response.assets[0].uri,
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          rotation: 0,
          isSelected: false,
        };
        dispatch({ type: 'ADD_ELEMENT', payload: newImageElement });
      }
    });
  };

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
      color: COLORS.black,
      fontSize: 24,
      fontFamily: 'System',
    };
    dispatch({ type: 'ADD_ELEMENT', payload: newTextElement });
  };

  const handleSaveText = (newText: string) => {
    if (selectedElement) {
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: { id: selectedElement.id, data: { text: newText } },
      });
    }
  };

  const handleColorChange = (newColor: string) => {
    if (selectedElement) {
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: { id: selectedElement.id, data: { color: newColor } },
      });
    }
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      dispatch({ type: 'REMOVE_ELEMENT', payload: { id: selectedElement.id } });
    }
  };

  const handleFontChange = (newFont: string) => {
    if (selectedElement) {
      dispatch({
        type: 'UPDATE_ELEMENT',
        payload: { id: selectedElement.id, data: { fontFamily: newFont } },
      });
    }
    setIsFontPickerVisible(false);
  };

  const handleAddPress = () => {
    Alert.alert('Add Element', 'What would you like to add?', [
      {
        text: 'Text',
        onPress: addTextElement,
      },
      {
        text: 'Image',
        onPress: addImageElement,
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
      {state.selectedElementId ? (
        <Animated.View entering={SlideInDown} exiting={SlideOutDown}>
          <EditingToolbar
          selectedElement={selectedElement}
          onEditText={() => setIsTextEditModalVisible(true)}
          onColorPress={() => setIsColorPickerVisible(true)}
          onFontPress={() => setIsFontPickerVisible(true)}
          onDelete={handleDeleteElement}
        />
        </Animated.View>
      ) : (
        <FloatingActionButton iconName="add-outline" onPress={handleAddPress} />
      )}
      {selectedElement && (
        <TextEditModal
          isVisible={isTextEditModalVisible}
          onClose={() => setIsTextEditModalVisible(false)}
          onSave={handleSaveText}
          initialText={selectedElement.text || ''}
        />
      )}
      {selectedElement && (
        <ColorPickerModal
          isVisible={isColorPickerVisible}
          onClose={() => setIsColorPickerVisible(false)}
          onSelectColor={handleColorChange}
          initialColor={(selectedElement as TextElement)?.color || '#000000'}
        />
      )}
      {selectedElement && (
        <FontPickerModal
          isVisible={isFontPickerVisible}
          onClose={() => setIsFontPickerVisible(false)}
          onSelectFont={handleFontChange}
        />
      )}
    </View>
  );
};

export default EditorScreen;
