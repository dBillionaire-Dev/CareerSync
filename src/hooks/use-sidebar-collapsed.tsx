import { useState, useEffect, useCallback } from 'react';

// Custom event for cross-component communication
const SIDEBAR_CHANGE_EVENT = 'sidebarCollapsedChange';

export const useSidebarCollapsed = () => {
  const [collapsed, setCollapsedState] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });

  const setCollapsed = useCallback((value: boolean) => {
    localStorage.setItem('sidebarCollapsed', String(value));
    setCollapsedState(value);
    window.dispatchEvent(new CustomEvent(SIDEBAR_CHANGE_EVENT, { detail: value }));
  }, []);

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  useEffect(() => {
    const handleChange = (e: CustomEvent) => {
      setCollapsedState(e.detail);
    };

    window.addEventListener(SIDEBAR_CHANGE_EVENT, handleChange as EventListener);
    return () => window.removeEventListener(SIDEBAR_CHANGE_EVENT, handleChange as EventListener);
  }, []);

  return { collapsed, setCollapsed, toggle };
};
