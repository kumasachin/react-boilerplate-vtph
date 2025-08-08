import { useEffect } from 'react';
import { type Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

// Thresholds based on Google's Core Web Vitals
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 }, // INP replaced FID
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function logMetric(metric: Metric) {
  const performanceMetric: PerformanceMetric = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔍 Performance Metric: ${metric.name}`);
    console.log('Value:', metric.value);
    console.log('Rating:', performanceMetric.rating);
    console.log('Delta:', metric.delta);
    console.groupEnd();
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Here you would send to your analytics service
    // Example: analytics.track('web-vital', performanceMetric);

    // Or send to custom endpoint
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(performanceMetric),
    }).catch(error => {
      console.error('Failed to send performance metric:', error);
    });
  }
}

export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Core Web Vitals
    onCLS(logMetric);
    onINP(logMetric); // Interaction to Next Paint (replaced FID)
    onLCP(logMetric);

    // Other useful metrics
    onFCP(logMetric);
    onTTFB(logMetric);

    // Custom performance marks
    performance.mark('app-hydrated');

    return () => {
      performance.clearMarks('app-hydrated');
    };
  }, []);

  // This component doesn't render anything
  return null;
};

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
