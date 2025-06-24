import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CanvasElement } from '../types';

// Define the shape of the editor's state
interface EditorState {
  elements: CanvasElement[];
}

// Define the actions that can be dispatched
type Action =
  | { type: 'ADD_ELEMENT'; payload: CanvasElement }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; data: Partial<CanvasElement> } }
  | { type: 'REMOVE_ELEMENT'; payload: { id: string } };

// Define the shape of the context
interface EditorContextProps {
  state: EditorState;
  dispatch: React.Dispatch<Action>;
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

const editorReducer = (state: EditorState, action: Action): EditorState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? ({ ...el, ...action.payload.data } as CanvasElement)
            : el
        ),
      };
    case 'REMOVE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const initialState: EditorState = {
  elements: [],
};

export const EditorProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
