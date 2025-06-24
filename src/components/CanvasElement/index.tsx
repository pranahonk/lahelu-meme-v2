import React from 'react';
import { Text, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CanvasElement as CanvasElementType, TextElement, ImageElement } from '../../types';
import { useEditor } from '../../contexts/EditorContext';
import styles from './style';

interface CanvasElementProps {
  element: CanvasElementType;
  canvasScale: Animated.SharedValue<number>;
  canvasSize: number;
}

const CanvasElement = ({ element, canvasScale, canvasSize }: CanvasElementProps): React.JSX.Element => {
  const { state, dispatch } = useEditor();
  const isSelected = state.selectedElementId === element.id;
  const isDragging = useSharedValue(false);
  const positionX = useSharedValue(element.x);
  const positionY = useSharedValue(element.y);
  const elementWidth = useSharedValue(0);
  const elementHeight = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
    })
    .onUpdate((e) => {
      'worklet';
      const newX = element.x + e.translationX / canvasScale.value;
      const newY = element.y + e.translationY / canvasScale.value;

      const clampedX = Math.max(0, Math.min(newX, canvasSize - elementWidth.value));
      const clampedY = Math.max(0, Math.min(newY, canvasSize - elementHeight.value));

      positionX.value = clampedX;
      positionY.value = clampedY;
    })
    .onEnd(() => {
      'worklet';
      runOnJS(dispatch)({
        type: 'UPDATE_ELEMENT',
        payload: { id: element.id, data: { x: positionX.value, y: positionY.value } },
      });
      isDragging.value = false;
    })
    .withTestId(`drag-${element.id}`);

  const tapGesture = Gesture.Tap().onEnd(() => {
    'worklet';
    runOnJS(dispatch)({
      type: 'SELECT_ELEMENT',
      payload: { id: element.id },
    });
  });

  const composedGesture = Gesture.Exclusive(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
      { scale: withSpring(isDragging.value ? 1.1 : 1) },
    ],
    zIndex: isDragging.value ? 10 : 1,
  }));

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        const textElement = element as TextElement;
        return (
          <Text style={{ color: textElement.color, fontSize: textElement.fontSize, fontFamily: textElement.fontFamily }}>
            {textElement.text}
          </Text>
        );
      case 'image':
        const imageElement = element as ImageElement;
        return (
          <Image
            source={{ uri: imageElement.uri }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[styles.container, animatedStyle, isSelected && styles.selected]}
        onLayout={(event) => {
          elementWidth.value = event.nativeEvent.layout.width;
          elementHeight.value = event.nativeEvent.layout.height;
        }}>
        {renderElement()}
      </Animated.View>
    </GestureDetector>
  );
};

export default CanvasElement;

