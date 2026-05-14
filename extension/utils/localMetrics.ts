interface Metric {
  action: string;
  durationMs: number;
  tokensSaved: number;
  timestamp: number;
}

export const logLocalMetric = (metric: Omit<Metric, 'timestamp'>) => {
  try {
    const data: Metric[] = JSON.parse(localStorage.getItem('tokzeth_metrics') || '[]');
    data.push({ ...metric, timestamp: Date.now() });
    
    // Keep max 1000 records to keep lightweight
    if (data.length > 1000) data.shift();
    
    localStorage.setItem('tokzeth_metrics', JSON.stringify(data));
  } catch (e) {
    // Silent fail to avoid disrupting UX
  }
};

export const getAverageTime = () => {
    try {
        const data: Metric[] = JSON.parse(localStorage.getItem('tokzeth_metrics') || '[]');
        if (!data.length) return 0;
        return data.reduce((acc, curr) => acc + curr.durationMs, 0) / data.length;
    } catch {
        return 0;
    }
};
