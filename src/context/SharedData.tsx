import React, { createContext, useContext, useState } from 'react';

type PeopleType = { adults: number; children: number };

type LocationType = {
  id: number;
  name: string;
  region: string;
  type: string;
};

type InputData = {
  location: LocationType | null;
  startDate: string;
  endDate: string;
  people: PeopleType;
};

type PeopleInfo = {
    contact: string;
    emailContact: string;
    phoneContact: string;
    obsContact: string | null;
    peoples: any

} ;

type SharedData = {
  inputData: InputData;
  hotelData: any;
  roomData: any;
  peopleInfo: PeopleInfo;

  setInputData: (data: SharedData['inputData']) => void;
  setHotelData: (data: any) => void;
  setRoomData: (data: any) => void;
  setPeopleInfo: (data: any) => void;
};

const SharedDataContext = createContext<SharedData | undefined>(undefined);

export const SharedDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputData, setInputData] = useState<InputData>({
    location: null,
    startDate: '',
    endDate: '',
    people: { adults: 0, children: 0 }
    });
  const [hotelData, setHotelData] = useState<any>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [peopleInfo, setPeopleInfo] = useState<any>(null);

  return (
    <SharedDataContext.Provider
      value={{
        inputData,
        hotelData,
        roomData,
        peopleInfo,
        setInputData,
        setHotelData,
        setRoomData,
        setPeopleInfo
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = () => {
  const context = useContext(SharedDataContext);
  if (!context) {
    throw new Error('useSharedData precisa ser usado com um SharedDataProvider');
  }
  return context;
};
