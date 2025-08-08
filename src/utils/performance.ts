// Utility function to manually track custom metrics
export function trackCustomMetric(name: string, value: number, unit = 'ms') {
  const customMetric = {
    name: `custom-${name}`,
    value,
    unit,
    timestamp: Date.now(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Custom Metric: ${name} = ${value}${unit}`);
  }

  // Send to analytics
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/custom-metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customMetric),
    }).catch(error => {
      console.error('Failed to send custom metric:', error);
    });
  }
}

// Performance timing utilities
export const performance$ = {
  mark: (name: string) => {
    performance.mark(name);
  },

  measure: (name: string, startMark: string, endMark?: string) => {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name, 'measure')[0];
    if (measure) {
      trackCustomMetric(name, measure.duration);
    }
    return measure;
  },

  time: async <T>(name: string, fn: () => Promise<T> | T): Promise<T> => {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;

    performance$.mark(startMark);
    try {
      const result = await fn();
      performance$.mark(endMark);
      performance$.measure(name, startMark, endMark);
      return result;
    } catch (error) {
      performance$.mark(endMark);
      performance$.measure(`${name}-error`, startMark, endMark);
      throw error;
    }
  },
};
