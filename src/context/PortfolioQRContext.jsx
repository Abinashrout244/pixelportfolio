import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import PortfolioQRModal from "../components/PortfolioQRModal";

const DEFAULT_STATE = {
  open: false,
  title: "Take My Portfolio With You",
  description: "One scan. Everything about me.",
  value: "/share",
  downloadFilename: "abinash-portfolio-qr.png",
  items: null,
};

const PortfolioQRContext = createContext(null);

export function PortfolioQRProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);

  const openQRModal = useCallback((options = {}) => {
    setState({
      ...DEFAULT_STATE,
      ...options,
      open: true,
    });
  }, []);

  const closeQRModal = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(
    () => ({
      openQRModal,
      closeQRModal,
      isOpen: state.open,
    }),
    [openQRModal, closeQRModal, state.open]
  );

  return (
    <PortfolioQRContext.Provider value={value}>
      {children}
      <PortfolioQRModal
        open={state.open}
        onClose={closeQRModal}
        title={state.title}
        description={state.description}
        projectName={state.projectName}
        value={state.value}
        downloadFilename={state.downloadFilename}
        items={state.items}
      />
    </PortfolioQRContext.Provider>
  );
}

export function usePortfolioQR() {
  const context = useContext(PortfolioQRContext);

  if (!context) {
    throw new Error("usePortfolioQR must be used within a PortfolioQRProvider");
  }

  return context;
}
