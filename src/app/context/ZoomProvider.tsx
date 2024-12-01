import { createContext, useContext, useState, ReactNode } from "react";

interface ZoomContextProps {
  isZoom: boolean;
  setIsZoom: (value: boolean) => void;
}

const ZoomContext = createContext<ZoomContextProps | undefined>(undefined);

export const ZoomProvider = ({ children }: { children: ReactNode }) => {
  const [isZoom, setIsZoom] = useState(false);

  return (
    <ZoomContext.Provider value={{ isZoom, setIsZoom }}>
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
};
