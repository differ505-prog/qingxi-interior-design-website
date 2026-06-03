interface Window {
  trackLeadEvent?: (
    name: string,
    params?: Record<string, string | number | boolean | null | undefined>,
  ) => void;
}
