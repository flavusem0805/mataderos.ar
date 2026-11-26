'use client';

import { useEffect, useRef } from 'react';
import { trackSumateEvent } from '@/lib/sumate-analytics';

interface SumateViewTrackerProps {
  page: 'sumate' | 'comercios' | 'emprendedores' | 'sponsors';
}

export function SumateViewTracker({ page }: SumateViewTrackerProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackSumateEvent('sumate_view', { page });
  }, [page]);

  return null;
}
