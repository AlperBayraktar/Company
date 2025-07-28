import React from 'react';
import { useBackground } from '../contexts/BackgroundContext';
import PossibleBackgroundComponents from './PossibleBackgroundComponents';

const BackgroundRenderer: React.FC = () => {
  const { backgroundState } = useBackground();
  
  // Use preview if in preview mode, otherwise use current
  const activeBackground = backgroundState.isPreviewMode 
    ? backgroundState.preview 
    : backgroundState.current;

  if (!activeBackground) return null;

  // Find the component configuration
  const componentConfig = PossibleBackgroundComponents.find(
    (comp: any) => comp.component.name === activeBackground.name
  );

  if (!componentConfig) return null;

  const BackgroundComponent = componentConfig.component;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1 }}>
      <BackgroundComponent {...activeBackground.props} />
    </div>
  );
};

export default BackgroundRenderer;
