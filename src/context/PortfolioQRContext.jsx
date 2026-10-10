import React, { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState } from "react";

const PortfolioQRModal = lazy(() => import("../features/PortfolioQRModal"));

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
      <Suspense fallback={null}>
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
      </Suspense>
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
