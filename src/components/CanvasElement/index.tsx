import React from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CanvasElement as CanvasElementType, TextElement } from '../../types';
import { useEditor } from '../../contexts/EditorContext';
import styles from './style';

interface CanvasElementProps {
  element: CanvasElementType;
  canvasScale: Animated.SharedValue<number>;
}

const CanvasElement = ({ element, canvasScale }: CanvasElementProps): React.JSX.Element => {
  const { state, dispatch } = useEditor();
  const isSelected = state.selectedElementId === element.id;
  const isDragging = useSharedValue(false);
  const positionX = useSharedValue(element.x);
  const positionY = useSharedValue(element.y);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
    })
    .onUpdate((e) => {
      positionX.value = element.x + e.translationX / canvasScale.value;
      positionY.value = element.y + e.translationY / canvasScale.value;
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
          <Text style={{ color: textElement.color, fontSize: textElement.fontSize }}>
            {textElement.text}
          </Text>
        );
      // Add cases for other element types (e.g., 'image') here
      default:
        return null;
    }
  };

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStyle, isSelected && styles.selected]}>
        {renderElement()}
      </Animated.View>
    </GestureDetector>
  );
};

export default CanvasElement;

