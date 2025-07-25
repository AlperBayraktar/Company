export interface BackgroundProp {
  prop: string;
  type: 'color' | 'number' | 'boolean';
  min?: number;
  max?: number;
  defaultValue: string | number | boolean;
}

export interface BackgroundComponentConfig {
  component: React.ComponentType<any>;
  text: string;
  gifUrl: string;
  props: BackgroundProp[];
}

export interface CurrentBackgroundComponent {
  name: string;
  props: Record<string, any>;
}

export interface BackgroundState {
  current: CurrentBackgroundComponent;
  preview?: CurrentBackgroundComponent;
  isPreviewMode: boolean;
}
