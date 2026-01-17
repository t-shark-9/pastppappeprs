import { useState, useEffect } from 'react';

// Generic hook for lazy loading data modules
export function useLazyData<T>(
  loader: () => Promise<T>,
  defaultValue: T
): { data: T; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((value) => {
        if (!cancelled) {
          setData(value);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load data:', err);
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

// Specific hooks for commonly used data - using any to avoid type conflicts
export function useChemistryQuestions() {
  return useLazyData<unknown[]>(
    () => import('@/data/past-papers/chemistryQuestions_extracted').then(m => m.chemistryQuestions),
    []
  );
}

export function useBiologyQuestions() {
  return useLazyData<unknown[]>(
    () => import('@/data/past-papers/biologyQuestions_extracted').then(m => m.biologyQuestions),
    []
  );
}

export function usePhysicsQuestions() {
  return useLazyData<unknown[]>(
    () => import('@/data/past-papers/physicsQuestions_extracted').then(m => m.physicsQuestions),
    []
  );
}

// Note: removed huge question-bank modules that were causing build out-of-memory issues.
// Keep only the smaller science question sets here.

