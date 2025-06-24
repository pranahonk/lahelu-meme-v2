// Defines the structure for a selectable meme template
export interface MemeTemplate {
  id: string;
  name: string;
  image: any; // Using 'any' for require statements
}

// Common properties for all canvas elements
interface ElementBase {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  isSelected: boolean;
}

// Properties specific to a text element
export interface TextElement extends ElementBase {
  type: 'text';
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
}

// Properties specific to an image element
export interface ImageElement extends ElementBase {
  type: 'image';
  uri: string;
}

// A union type for any element that can be on the canvas
export type CanvasElement = TextElement | ImageElement;
