import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import PossibleBackgroundComponents from "./PossibleBackgroundComponents";
import { useBackground } from "../contexts/BackgroundContext";


interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { setCurrentBackground, setPreviewBackground, clearPreview } = useBackground();

  const [activeSection, setActiveSection] = useState<"backgrounds" | "other">("backgrounds");
  const [previewMode, setPreviewMode] = useState(false);
  // Load initial background and props from localStorage if available
  const getPersistedProps = (bgName: string, propsArr: any[]) => {
    try {
      const persisted = JSON.parse(localStorage.getItem('backgroundSettings') || '{}');
      const persistedProps = persisted.backgroundProps?.[bgName] || {};
      const obj: Record<string, any> = {};
      propsArr.forEach((p: any) => {
        obj[p.prop] = persistedProps[p.prop] !== undefined ? persistedProps[p.prop] : p.defaultValue;
      });
      return obj;
    } catch {
      const obj: Record<string, any> = {};
      propsArr.forEach((p: any) => {
        obj[p.prop] = p.defaultValue;
      });
      return obj;
    }
  };
  // Selected background index and props
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [backgroundProps, setBackgroundProps] = useState<Record<string, any>>({});
  const propsBackupRef = useRef<any>(null);

  // On modal open, set selectedIdx and props to active background from storage
  useEffect(() => {
    if (isOpen) {
      try {
        const persisted = JSON.parse(localStorage.getItem('backgroundSettings') || '{}');
        const idx = PossibleBackgroundComponents.findIndex(
          (bg: any) => bg.component.name === persisted.activeBackground
        );
        const finalIdx = idx >= 0 ? idx : 0;
        setSelectedIdx(finalIdx);
        const props = getPersistedProps(PossibleBackgroundComponents[finalIdx].component.name, PossibleBackgroundComponents[finalIdx].props);
        setBackgroundProps(props);
        propsBackupRef.current = props;
      } catch {
        setSelectedIdx(0);
        const props = getPersistedProps(PossibleBackgroundComponents[0].component.name, PossibleBackgroundComponents[0].props);
        setBackgroundProps(props);
        propsBackupRef.current = props;
      }
    }
    // eslint-disable-next-line
  }, [isOpen]);

  // For preview modal reopen
  const [isModalVisible, setIsModalVisible] = useState(true);
  const mouseMoveListener = useRef<any>(null);

  const handlePreview = (idx: number) => {
    // Backup current props before preview
    propsBackupRef.current = { ...backgroundProps };
    setSelectedIdx(idx);
    setPreviewBackground(
      PossibleBackgroundComponents[idx].component.name,
      { ...backgroundProps }
    );
    setPreviewMode(true);
    setIsModalVisible(false); // Hide modal
  };

  // When previewMode is active and modal is hidden, listen for mousemove to cancel preview and reopen modal
  useEffect(() => {
    if (previewMode && !isModalVisible) {
      mouseMoveListener.current = () => {
        clearPreview();
        setPreviewMode(false);
        setIsModalVisible(true);
        // Restore unsaved changes after preview ends
        if (propsBackupRef.current) {
          setBackgroundProps(propsBackupRef.current);
        }
        window.removeEventListener("mousemove", mouseMoveListener.current);
      };
      window.addEventListener("mousemove", mouseMoveListener.current);
      return () => window.removeEventListener("mousemove", mouseMoveListener.current);
    }
    // eslint-disable-next-line
  }, [previewMode, isModalVisible]);

  const handleApplyBackground = (idx: number) => {
    setSelectedIdx(idx);
    setCurrentBackground(
      PossibleBackgroundComponents[idx].component.name,
      { ...backgroundProps }
    );
    // Save to localStorage
    try {
      const bgName = PossibleBackgroundComponents[idx].component.name;
      const persisted = JSON.parse(localStorage.getItem('backgroundSettings') || '{}');
      localStorage.setItem(
        'backgroundSettings',
        JSON.stringify({
          ...persisted,
          activeBackground: bgName,
          backgroundProps: {
            ...(persisted.backgroundProps || {}),
            [bgName]: {
              ...(persisted.backgroundProps?.[bgName] || {}),
              ...backgroundProps
            }
          }
        })
      );
    } catch {}
    setPreviewMode(false);
    onClose();
  };

  const handlePropChange = (prop: string, value: any) => {
    setBackgroundProps((prev) => {
      const updated = { ...prev, [prop]: value };
      propsBackupRef.current = updated; // Always keep backup in sync with UI
      return updated;
    });
  };

  // Modal dark theme and layout
  return (
    <AnimatePresence>
      {isOpen && isModalVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#181C22] text-gray-100 rounded-2xl shadow-2xl w-full max-w-5xl h-[68vh] flex overflow-hidden border border-gray-800">
              {/* Sidebar */}
              <div className="w-64 bg-[#23272F] border-r border-gray-800">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-100">Ayarlar</h2>
                </div>
                <nav className="p-2">
                  <button
                    onClick={() => setActiveSection("backgrounds")}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 transition-colors ${
                      activeSection === "backgrounds"
                        ? "bg-blue-900/60 text-blue-400"
                        : "text-gray-300 hover:bg-[#23272F]/70"
                    }`}
                  >
                    Arka Planlar
                  </button>
                  <button
                    onClick={() => setActiveSection("other")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === "other"
                        ? "bg-blue-900/60 text-blue-400"
                        : "text-gray-300 hover:bg-[#23272F]/70"
                    }`}
                  >
                    Diğer
                  </button>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-100 capitalize">
                    {activeSection === "backgrounds" ? "Arka Planlar" : "Diğer"}
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors hover:cursor-pointer"
                  >
                    <MdClose size={24} className="text-gray-300" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {activeSection === "backgrounds" && (
                    <div>
                      <div className="mb-4 text-sm text-yellow-400 bg-yellow-900/40 border border-yellow-700 rounded-[4px] px-3 py-2 flex items-center gap-2">
                        <IoIosWarning size={36} className="text-yellow-400" />
                        Animasyonlu arka planlar bilgisayarınızın GPU gücünü aşırı kullanabilir ve performans sorunlarına yol açabilir. Problem yaşarsanız arka planların -varsa- animasyonlarını kapatmayı veya düz renk arka plan kullanmayı deneyebilirsiniz.
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {PossibleBackgroundComponents.map((bg: any, idx: number) => (
                          <div
                            key={bg.text}
                            className={`border rounded-xl p-4 transition-shadow relative ${idx === selectedIdx ? "border-blue-500 shadow-lg" : "border-gray-800 hover:shadow-md"}`}
                            onClick={() => {
                              if (selectedIdx !== idx) {
                                setSelectedIdx(idx);
                                const props = getPersistedProps(bg.component.name, bg.props);
                                setBackgroundProps(props);
                                propsBackupRef.current = props;
                              }
                            }}
                          >
                            <div className="aspect-video bg-[#23272F] rounded-lg mb-3 flex items-center justify-center border border-gray-800">
                              {/* GIF preview or solid color preview */}
                              {bg.gifUrl ? (
                                <img src={bg.gifUrl} alt={bg.text} className="rounded max-h-24 mx-auto" />
                              ) : bg.props?.find((p: any) => p.type === "color") && idx === 0 ? (
                                <div className="w-16 h-8 rounded-lg border border-gray-700" style={{ backgroundColor: backgroundProps["color"] }} />
                              ) : (
                                <span className="text-gray-600">Ön izleme</span>
                              )}
                            </div>
                            <h5 className="font-medium text-gray-100 mb-2">{bg.text}</h5>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handlePreview(idx)}
                                className="flex-1 px-3 py-1 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors hover:cursor-pointer"
                              >
                                Ön izle
                              </button>
                              <button
                                onClick={() => handleApplyBackground(idx)}
                                className="flex-1 px-3 py-1 text-sm bg-green-700 text-white rounded hover:bg-green-800 transition-colors hover:cursor-pointer"
                              >
                                Uygula
                              </button>
                            </div>
                            {idx === 0 && (
                              <div className="absolute top-2 right-2 bg-blue-600 text-xs px-2 py-0.5 rounded text-white">Varsayılan</div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Prop Controls for Selected Background */}
                      <div className="mt-8">
                        <h6 className="mb-2 text-gray-300 font-semibold">Ayarlar</h6>
                        <div className="space-y-3">
                          {PossibleBackgroundComponents[selectedIdx]?.props?.map((prop: any, pi: number) => (
                            <div key={prop.prop} className="flex items-center gap-3">
                              <label className="text-gray-200 whitespace-nowrap" style={{width: 'fit-content', minWidth: 0, fontFamily: 'monospace'}}>{prop.prop}</label>
                              {prop.type === "color" ? (
                                <>
                                  <input
                                    type="color"
                                    value={backgroundProps[prop.prop]}
                                    onChange={e => handlePropChange(prop.prop, e.target.value)}
                                    className="w-8 h-8 p-0 border-0 bg-transparent"
                                  />
                                  <span className="text-xs bg-gray-800 px-2 py-0.5 rounded">{backgroundProps[prop.prop]}</span>
                                </>
                              ) : prop.type === "number" ? (
                                <>
                                  <input
                                    type="range"
                                    min={prop.min}
                                    max={prop.max}
                                    step={0.01}
                                    value={backgroundProps[prop.prop]}
                                    onChange={e => handlePropChange(prop.prop, Number(e.target.value))}
                                    className="w-40 accent-blue-500"
                                  />
                                  <span className="text-xs bg-gray-800 px-2 py-0.5 rounded">{backgroundProps[prop.prop]}</span>
                                </>
                              ) : prop.type === "boolean" ? (
                                <>
                                  <input
                                    type="checkbox"
                                    checked={backgroundProps[prop.prop]}
                                    onChange={e => handlePropChange(prop.prop, e.target.checked)}
                                    className="accent-blue-500"
                                  />
                                  <span className="text-xs bg-gray-800 px-2 py-0.5 rounded">{backgroundProps[prop.prop] ? "Açık" : "Kapalı"}</span>
                                </>
                              ) : null}
                            </div>
                          ))}

                          {/* Sıfırla Button */}
                          <button
                            className="mt-2 px-4 py-1 bg-gray-700 hover:bg-gray-600 text-xs rounded text-white border border-gray-600 transition-colors"
                            onClick={() => {
                              const defaults: Record<string, any> = {};
                              PossibleBackgroundComponents[selectedIdx]?.props?.forEach((p: any) => {
                                defaults[p.prop] = p.defaultValue;
                              });
                              setBackgroundProps(defaults);
                            }}
                          >
                            Sıfırla
                          </button>

                          {/* SolidColorBackground için önerilen renkler */}
                          {PossibleBackgroundComponents[selectedIdx]?.component?.name === "SolidColorBackground" && (
                            <div className="mt-4">
                              <div className="mb-1 text-xs text-gray-400">Tavsiye Edilen Renkler:</div>
                              <div className="flex gap-2">
                                {["#4C0719","#052F2E","#0C4A70","#1c2e4a"].map(color => (
                                  <button
                                    key={color}
                                    type="button"
                                    className="w-7 h-7 rounded border-2 border-gray-600 hover:border-blue-500 transition-all"
                                    style={{ backgroundColor: color }}
                                    onClick={() => handlePropChange("color", color)}
                                  >
                                    {backgroundProps["color"] === color && (
                                      <span className="block w-full h-full rounded ring-2 ring-blue-400"></span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>

                      {/* Preview Mode Indicator */}
                      {previewMode && (
                        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg z-[999]">
                          <span className="mr-2">🔍 Ön izleme Modu Aktif</span>
                          <button
                            onClick={() => setPreviewMode(false)}
                            className="underline hover:no-underline"
                          >
                            Çıkış
                          </button>
                        </div>
                      )}
                            

                    </div>
                  )}

                  {activeSection === "other" && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-100 mb-4">
                        Diğer Ayarlar
                      </h4>
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">⚙️</span>
                          </div>
                        </div>
                        <p className="text-gray-400">Diğer ayarlar buraya eklenecek.</p>
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
