import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Filler
);

function getChartColors(theme) {
  const isDark = theme !== 'light';
  return {
    primary: isDark ? '#c9a44c' : '#9a7a2e',
    primaryLight: isDark ? 'rgba(201,164,76,0.15)' : 'rgba(154,122,46,0.1)',
    text: isDark ? '#e8e6e1' : '#1a1a1d',
    textMuted: isDark ? '#9a9894' : '#6b6966',
    textFaint: isDark ? '#5a5856' : '#a09e9a',
    grid: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    surface: isDark ? '#18181b' : '#f5f4f1',
  };
}

export function MarketData({ theme }) {
  const { t, i18n } = useTranslation();
  const isEN = i18n.language === 'en';
  const c = getChartColors(theme);

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: c.surface,
        titleColor: c.text,
        bodyColor: c.textMuted,
        borderColor: c.primary,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { family: "'Satoshi', sans-serif", weight: 600 },
        bodyFont: { family: "'Satoshi', sans-serif" },
      }
    },
    scales: {
      x: {
        grid: { color: c.grid },
        ticks: { color: c.textMuted, font: { family: "'Satoshi', sans-serif", size: 11 } },
        border: { display: false }
      },
      y: {
        grid: { color: c.grid },
        ticks: { color: c.textMuted, font: { family: "'Satoshi', sans-serif", size: 11 } },
        border: { display: false }
      }
    },
    animation: { duration: 1000, easing: 'easeOutQuart' }
  };

  const pricesData = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: isEN ? 'Avg. price (USD)' : 'Średnia cena (USD)',
      data: [1800, 2100, 2400, 2600, 3200, 4100, 4500, 5200, 5800, 6400],
      borderColor: c.primary,
      backgroundColor: c.primaryLight,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: c.primary,
      pointBorderColor: c.surface,
      pointBorderWidth: 2,
      borderWidth: 2
    }]
  };

  const pricesOptions = {
    ...defaultOptions,
    scales: {
      ...defaultOptions.scales,
      y: {
        ...defaultOptions.scales.y,
        ticks: {
          ...defaultOptions.scales.y.ticks,
          callback: (v) => '$' + v.toLocaleString()
        }
      }
    }
  };

  const regsData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: isEN ? 'Registrations (M)' : 'Rejestracje (mln)',
      data: [354, 360, 367, 370, 359, 364, 380],
      backgroundColor: c.primary + '33',
      borderColor: c.primary,
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: c.primary + '66',
    }]
  };

  const regsOptions = {
    ...defaultOptions,
    scales: {
      ...defaultOptions.scales,
      y: {
        ...defaultOptions.scales.y,
        min: 340,
        ticks: {
          ...defaultOptions.scales.y.ticks,
          callback: (v) => v + (isEN ? 'M' : ' mln')
        }
      }
    }
  };

  const availData = {
    labels: [isEN ? 'Taken' : 'Zajęte', isEN ? 'Available' : 'Dostępne'],
    datasets: [{
      data: [95, 5],
      backgroundColor: [c.primary, c.grid],
      borderColor: [c.primary, c.textFaint + '30'],
      borderWidth: 1,
      hoverOffset: 4
    }]
  };

  const availOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: c.textMuted,
          font: { family: "'Satoshi', sans-serif", size: 12 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10
        }
      },
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`
        }
      }
    }
  };

  return (
    <section className="px-6 py-[clamp(3rem,8vw,6rem)]" id="market">
      <div className="text-center max-w-[680px] mx-auto mb-12">
        <div className="text-xs text-primary uppercase tracking-[0.12em] font-semibold mb-3">{t('market_overline')}</div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] text-text mb-4 tracking-[-0.02em]">{t('market_title')}</h2>
        <p className="text-base sm:text-lg text-text-muted leading-[1.7]">{t('market_desc')}</p>
      </div>

      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-surface-2 border border-border rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6">
              <span className="text-base font-semibold text-text">{t('chart1_title')}</span>
              <span className="text-xs text-text-muted">{t('chart1_sub')}</span>
            </div>
            <div className="relative h-[260px] w-full">
              <Line data={pricesData} options={pricesOptions} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-2 border border-border rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6">
              <span className="text-base font-semibold text-text">{t('chart2_title')}</span>
              <span className="text-xs text-text-muted">{t('chart2_sub')}</span>
            </div>
            <div className="relative h-[260px] w-full">
              <Bar data={regsData} options={regsOptions} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-2 border border-border rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6">
              <span className="text-base font-semibold text-text">{t('chart3_title')}</span>
              <span className="text-xs text-text-muted">{t('chart3_sub')}</span>
            </div>
            <div className="relative h-[260px] w-full">
              <Doughnut data={availData} options={availOptions} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
