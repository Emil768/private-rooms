import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: T[]) => void>(callback: T, delay: number) => {
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	return useCallback(
		(...args: Parameters<T>) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}

			timer.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);
};
