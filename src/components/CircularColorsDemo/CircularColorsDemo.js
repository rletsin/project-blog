"use client";

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';
import { LayoutGroup, motion } from 'framer-motion';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();

  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timeoutId = setInterval(() => {
        setTimeElapsed((currentTime) => currentTime + 1);
    }, 1000);

    return () => clearInterval(timeoutId);
  }, [isRunning]);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <motion.li className={styles.color} key={index} layout={true}>
              {isSelected && <motion.div layoutId={`${id}-selected-color-outline`} className={styles.selectedColorOutline} />}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
                layout={"position"}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </motion.li>
          );
        })}
      </ul>
      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {!isRunning ? (
            <button onClick={() => setIsRunning(!isRunning)}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          ) : (
            <button onClick={() => setIsRunning(!isRunning)}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeElapsed(0);
              setSelectedColor(COLORS[0]);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
