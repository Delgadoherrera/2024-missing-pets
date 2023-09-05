import React, { createContext, useContext, useState } from "react";

interface MapContextType {
  mapState: any; // Coloca el tipo adecuado para mapState
  setMapState: React.Dispatch<React.SetStateAction<any>>; // Ajusta el tipo de setMapState
  createMap: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC = (children:any ) => {
  const [mapState, setMapState] = useState<any>(/* initial state here */);

  const createMap = () => {
    // Logic for creating the map
  };

  const contextValue: MapContextType = {
    mapState,
    setMapState,
    createMap
  };

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
