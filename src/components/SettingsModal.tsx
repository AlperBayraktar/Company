import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useBackground } from "../contexts/BackgroundContext";
import PossibleBackgroundComponents from "./PossibleBackgroundComponents";
import { PropInput } from "./PropInputs";
import { BackgroundComponentConfig } from "../types/BackgroundTypes";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<"backgrounds" | "other">("backgrounds");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [tempProps, setTempProps] = useState<Record<string, any>>({});
  
  const {
    backgroundState,
    setPreviewBackground,
    clearPreview,
    applyPreview,
    getDefaultPropsForComponent
  } = useBackground();

  useEffect(() => {
    if (isOpen) {
      setSelectedComponent(backgroundState.current.name);
      setTempProps(backgroundState.current.props);
    }
  }, [isOpen]);

  const handleSelectComponent = (componentName: string) => {
    setSelectedComponent(componentName);
    const defaultProps = getDefaultPropsForComponent(componentName);
    setTempProps(defaultProps);
  };

  const handlePropChange = (propName: string, value: any) => {
    setTempProps(prev => ({
      ...prev,
      [propName]: value
    }));
  };

  const handlePreview = () => {
    if (selectedComponent) {
      setPreviewBackground(selectedComponent, tempProps);
    }
  };

  const handleApply = () => {
    applyPreview();
    setSelectedComponent(null);
    setTempProps({});
  };

  const handleCancel = () => {
    clearPreview();
    setSelectedComponent(null);
    setTempProps({});
  };

  const handleClose = () => {
    handleCancel();
    onClose();
  };

  const getSelectedComponentConfig = (): BackgroundComponentConfig | null => {
    if (!selectedComponent) return null;
    return PossibleBackgroundComponents.find(
      (comp: any) => comp.component.name === selectedComponent
    ) || null;
  };

  const selectedConfig = getSelectedComponentConfig();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 bg-gray-100 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
                </div>
                
                <nav className="p-2">
                  <button
                    onClick={() => setActiveSection("backgrounds")}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 transition-colors ${
                      activeSection === "backgrounds"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Backgrounds
                  </button>
                  
                  <button
                    onClick={() => setActiveSection("other")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === "other"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Other
                  </button>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {activeSection}
                  </h3>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <MdClose size={24} className="text-gray-600" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {activeSection === "backgrounds" && (
                    <div className="flex gap-6 h-full">
                      {/* Component List */}
                      <div className="w-1/3">
                        <h4 className="text-lg font-medium text-gray-800 mb-4">
                          Background Components
                        </h4>
                        <div className="space-y-2">
                          {PossibleBackgroundComponents.map((comp: any, index: number) => (
                            <div
                              key={index}
                              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                                selectedComponent === comp.component.name
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleSelectComponent(comp.component.name)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                                  {comp.gifUrl ? (
                                    <img src={comp.gifUrl} alt={comp.text} className="w-full h-full object-cover rounded" />
                                  ) : (
                                    'GIF'
                                  )}
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-800">{comp.text}</h5>
                                  <p className="text-xs text-gray-500">
                                    {comp.props.length} properties
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Properties Panel */}
                      <div className="flex-1">
                        {selectedComponent ? (
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-medium text-gray-800">
                                {selectedConfig?.text} Settings
                              </h4>
                              <div className="flex gap-2">
                                <button
                                  onClick={handleCancel}
                                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handlePreview}
                                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                  Preview
                                </button>
                                {backgroundState.isPreviewMode && (
                                  <button
                                    onClick={handleApply}
                                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                  >
                                    Apply
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              {selectedConfig?.props.map((prop, index) => (
                                <PropInput
                                  key={index}
                                  prop={prop}
                                  value={tempProps[prop.prop]}
                                  onChange={(value) => handlePropChange(prop.prop, value)}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🎨</span>
                              </div>
                              <p className="text-gray-500">Select a background component to customize its settings</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeSection === "other" && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-4">
                        Other Settings
                      </h4>
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">⚙️</span>
                          </div>
                        </div>
                        <p className="text-gray-500">Other settings will be added here.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SettingsModal;
