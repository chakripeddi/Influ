// Move to src/integrations/monitoring/index.ts
import { PerformanceMonitor } from './monitoring';
import { Logger, FileTransport, ConsoleTransport } from './logging';

export const monitor = new PerformanceMonitor({
  metrics: ['responseTime', 'errorRate', 'concurrentUsers'],
  alertThresholds: {
    responseTime: 1000,
    errorRate: 0.01,
    concurrentUsers: 8000,
  },
});

export const logger = new Logger({
  level: 'info',
  format: 'json',
  transports: [
    new FileTransport('error.log'),
    new ConsoleTransport(),
  ],
});