import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BackgroundState } from '../types/BackgroundTypes';
import PossibleBackgroundComponents from '../components/PossibleBackgroundComponents';
import { loadBackgroundSettings, saveBackgroundSettings } from '../utils/backgroundPersistence';

interface BackgroundContextType {
  backgroundState: BackgroundState;
  setCurrentBackground: (name: string, props: Record<string, any>) => void;
  setPreviewBackground: (name: string, props: Record<string, any>) => void;
  clearPreview: () => void;
  applyPreview: () => void;
  getDefaultPropsForComponent: (componentName: string) => Record<string, any>;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

interface BackgroundProviderProps {
  children: ReactNode;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ children }) => {
  // Initialize with DarkVeil as default
  const getDefaultPropsForComponent = (componentName: string): Record<string, any> => {
    const component = PossibleBackgroundComponents.find(
      (comp: any) => comp.component.name === componentName
    );
    if (!component) return {};
    
    const defaultProps: Record<string, any> = {};
    component.props.forEach((prop: any) => {
      defaultProps[prop.prop] = prop.defaultValue;
    });
    return defaultProps;
  };

  const [backgroundState, setBackgroundState] = useState<BackgroundState>(() => {
    // Try to load from persistence
    const loaded = loadBackgroundSettings();
    if (loaded && loaded.activeBackground) {
      return {
        current: {
          name: loaded.activeBackground,
          props: loaded.backgroundProps?.[loaded.activeBackground] || getDefaultPropsForComponent(loaded.activeBackground)
        },
        isPreviewMode: false
      };
    }
    // fallback
    return {
      current: {
        name: 'DarkVeil',
        props: getDefaultPropsForComponent('DarkVeil')
      },
      isPreviewMode: false
    };
  });

  const setCurrentBackground = (name: string, props: Record<string, any>) => {
    setBackgroundState(prev => {
      const newState = {
        ...prev,
        current: { name, props }
      };
      // Save to persistence
      saveBackgroundSettings({
        activeBackground: name,
        backgroundProps: {
          ...(loadBackgroundSettings()?.backgroundProps || {}),
          [name]: props
        }
      });
      return newState;
    });
  };

  const setPreviewBackground = (name: string, props: Record<string, any>) => {
    setBackgroundState(prev => ({
      ...prev,
      preview: { name, props },
      isPreviewMode: true
    }));
  };

  const clearPreview = () => {
    setBackgroundState(prev => ({
      ...prev,
      preview: undefined,
      isPreviewMode: false
    }));
  };

  const applyPreview = () => {
    setBackgroundState(prev => {
      const next = {
        ...prev,
        current: prev.preview || prev.current,
        preview: undefined,
        isPreviewMode: false
      };
      if (next.current) {
        saveBackgroundSettings({
          activeBackground: next.current.name,
          backgroundProps: {
            ...(loadBackgroundSettings()?.backgroundProps || {}),
            [next.current.name]: next.current.props
          }
        });
      }
      return next;
    });
  };

  return (
    <BackgroundContext.Provider
      value={{
        backgroundState,
        setCurrentBackground,
        setPreviewBackground,
        clearPreview,
        applyPreview,
        getDefaultPropsForComponent
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};
