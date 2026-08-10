"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

type GlobalSettingsContextType = {
  companyName: string;
  loading: boolean;
};

const GlobalSettingsContext = createContext<GlobalSettingsContextType>({
  companyName: "Maple AG Global LTD",
  loading: true,
});

export const GlobalSettingsProvider = ({ 
  children, 
  initialCompanyName 
}: { 
  children: React.ReactNode, 
  initialCompanyName?: string 
}) => {
  const [companyName, setCompanyName] = useState(initialCompanyName || "Maple AG Global LTD");
  const [loading, setLoading] = useState(!initialCompanyName);

  useEffect(() => {
    if (!initialCompanyName) {
      fetchApi("/settings/companyName")
        .then((res) => {
          if (res.data) {
            setCompanyName(res.data.companyName || res.data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [initialCompanyName]);

  return (
    <GlobalSettingsContext.Provider value={{ companyName, loading }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => useContext(GlobalSettingsContext);
