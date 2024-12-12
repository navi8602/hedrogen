export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('ru-RU', options).format(value);
}

export function formatCurrency(value: number): string {
  return formatNumber(value, {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

export function formatPercent(value: number): string {
  return formatNumber(value, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}