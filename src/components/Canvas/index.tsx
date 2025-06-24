import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import styles, {canvasSize} from './style';
import {useEditor} from '../../contexts/EditorContext';
import CanvasElement from '../CanvasElement';

// Define zoom constraints
const MIN_SCALE = 0.5;
const MAX_SCALE = 4;

interface CanvasProps {
  backgroundImage: ImageSourcePropType | null;
}

const Canvas = ({backgroundImage}: CanvasProps): React.JSX.Element => {
  const {state, dispatch} = useEditor();

  // Live state of the canvas transformation
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  // Gesture context to store state at the beginning of a gesture
  const context = useSharedValue({x: 0, y: 0, s: 1});

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      context.value = {
        x: translateX.value,
        y: translateY.value,
        s: scale.value,
      };
    })
    .onUpdate(e => {
      const newScale = context.value.s * e.scale;
      scale.value = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE));

      // To zoom towards the focal point, we adjust the translation.
      // The formula is: new_translation = focal_point - (focal_point - old_translation) * scale_ratio
      const scaleRatio = scale.value / context.value.s;
      translateX.value = e.focalX - (e.focalX - context.value.x) * scaleRatio;
      translateY.value = e.focalY - (e.focalY - context.value.y) * scaleRatio;
    });

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => {
      context.value = {
        ...context.value,
        x: translateX.value,
        y: translateY.value,
      };
    })
    .onUpdate(e => {
      translateX.value = context.value.x + e.translationX;
      translateY.value = context.value.y + e.translationY;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  // The context object is shared between simultaneous gestures,
  // allowing them to coordinate their state updates.
  const tapToDeselectGesture = Gesture.Tap().onEnd(() => {
    'worklet';
    runOnJS(dispatch)({
      type: 'SELECT_ELEMENT',
      payload: {id: null},
    });
  });

  // The context object is shared between simultaneous gestures,
  // allowing them to coordinate their state updates.
  const composedGesture = Gesture.Exclusive(
    Gesture.Simultaneous(pinchGesture, panGesture),
    tapToDeselectGesture,
  );

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.canvas, animatedStyle]}>
          <View style={styles.canvasBackground} />
          {backgroundImage && (
            <Image
              source={backgroundImage}
              style={styles.backgroundImage}
              resizeMode="contain"
            />
          )}
          {state.elements.map(element => (
            <CanvasElement
              key={element.id}
              element={element}
              canvasScale={scale}
              canvasSize={canvasSize}
            />
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Canvas;


