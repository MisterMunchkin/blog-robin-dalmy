import React from 'react';
import styles from './styles.module.css';

// Values transcribed from the original bounded experiment reports.
// Keep disk payload (decimal GB), charged footprint (GiB), and elapsed time
// separate. These are individual observations, not repeated-trial averages.
const figures = {
  storage: {
    eyebrow: 'Qwen3-8B · Streaming test',
    title: 'Smaller on disk, with every weight preserved',
    highlight: '24.96% smaller payload',
    metric: 'Weight storage · GB',
    max: 20,
    ticks: ['0', '5', '10', '15', '20 GB'],
    rows: [
      { label: 'Raw', value: 16.38147072, display: '16.38 GB' },
      { label: 'Compressed', value: 12.292704089, display: '12.29 GB' },
    ],
    note: 'GB means 1 billion bytes. This measures the weight payload on disk, not RAM use. All 8.19 billion weight values matched bit-for-bit.',
  },
  resident: {
    eyebrow: 'Qwen3-1.7B · Resident-payload test',
    title: 'Less memory, longer execution',
    highlight: '23.34% lower charged footprint',
    metric: 'Peak charged memory · GiB',
    max: 4,
    ticks: ['0', '1', '2', '3', '4 GiB'],
    rows: [
      { label: 'Raw', value: 3.423, display: '3.423 GiB' },
      { label: 'Compressed', value: 2.624, display: '2.624 GiB' },
    ],
    timings: [
      { label: 'Prompt processing', raw: 0.550, compressed: 0.789 },
      { label: 'Decode step 1', raw: 0.489, compressed: 0.718 },
      { label: 'Decode step 2', raw: 0.472, compressed: 0.728 },
    ],
    note: 'Individual short runs, not trial averages. The weight payload was resident at each observed inference checkpoint; neither inference run recorded swap-in or swap-out. Two decode steps do not measure sustained generation speed.',
  },
  larger: {
    eyebrow: 'Qwen3-8B · Completed compressed-first pair',
    title: 'A lower footprint, under unequal conditions',
    warning: 'Both runs involved paging. Starting memory differed.',
    metric: 'Peak charged memory · GiB',
    max: 20,
    ticks: ['0', '5', '10', '15', '20 GiB'],
    rows: [
      { label: 'Raw', value: 15.51, display: '15.51 GiB', detail: 'Started with 17.70 GiB available, after cleanup' },
      { label: 'Compressed', value: 11.71, display: '11.71 GiB', detail: 'Ran first; started with 9.69 GiB available' },
    ],
    note: 'Charged footprint is not continuous physical residency. This pair does not establish a controlled reduction in system memory pressure or prove that a fully resident 8B model fits.',
  },
};

function BarRows({ rows, max, ticks, compact = false }) {
  return (
    <div className={compact ? styles.compactPlot : styles.plot}>
      <ul className={styles.rows}>
        {rows.map((row) => (
          <li key={row.label} className={styles.row}>
            <div className={styles.rowLabel}>
              <span>{row.label}</span>
              <strong>{row.display}</strong>
            </div>
            {row.detail && <p className={styles.detail}>{row.detail}</p>}
            <div className={styles.track} aria-hidden="true">
              <div
                className={row.label === 'Compressed' ? styles.compressed : styles.raw}
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.axis} aria-hidden="true">
        {ticks.map((tick, index) => <span key={tick} style={{ left: `${(index / (ticks.length - 1)) * 100}%` }}>{tick}</span>)}
      </div>
    </div>
  );
}

export default function CompressionBenchmarks({ kind }) {
  const data = figures[kind];
  if (!data) return null;
  const id = `compression-chart-${kind}`;
  return (
    <figure className={styles.figure} aria-labelledby={`${id}-title`} aria-describedby={`${id}-note`}>
      <figcaption>
        <p className={styles.eyebrow}>{data.eyebrow}</p>
        <p className={styles.title} id={`${id}-title`}>{data.title}</p>
        {data.highlight && <p className={styles.highlight}>{data.highlight}</p>}
        {data.warning && <p className={styles.warning}>{data.warning}</p>}
      </figcaption>
      <p className={styles.metric}>{data.metric}</p>
      <BarRows rows={data.rows} max={data.max} ticks={data.ticks} />
      {data.timings && (
        <div className={styles.timings}>
          <p className={styles.metric}>Elapsed time · seconds · lower is faster</p>
          <div className={styles.timingGrid}>
            {data.timings.map((timing) => (
              <section className={styles.timingGroup} key={timing.label} aria-label={timing.label}>
                <p className={styles.timingTitle}>{timing.label}</p>
                <BarRows
                  compact
                  max={1}
                  ticks={['0', '0.5', '1 s']}
                  rows={[
                    { label: 'Raw', value: timing.raw, display: `${timing.raw.toFixed(3)} s` },
                    { label: 'Compressed', value: timing.compressed, display: `${timing.compressed.toFixed(3)} s` },
                  ]}
                />
              </section>
            ))}
          </div>
        </div>
      )}
      <p className={styles.note} id={`${id}-note`}>{data.note}</p>
    </figure>
  );
}
