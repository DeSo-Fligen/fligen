import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypedUseSelectorHook, useSelector as _useSeletor } from "react-redux";
import { RootReducer } from "../state/store";

type TimerCallback<T> = { fn: T, timer: NodeJS.Timeout | null }

// function useDebounce<T extends Function>(fn: T, delay: number, dep: any[] = []) {
//   const { current } = useRef<TimerCallback<T>>({ fn, timer: null });
//   useEffect(function () {
//     current.fn = fn;
//   }, [current, fn]);

//   return useCallback((...args) => {
//     if (current.timer) {
//       clearTimeout(current.timer);
//     }
//     current.timer = setTimeout(() => {
//       current.fn(...args);
//     }, delay);
//   }, dep)
// }

// function useThrottle<T extends Function>(fn: T, delay: number, dep: any[] = []) {
//   const { current } = useRef<TimerCallback<T>>({ fn, timer: null });
//   useEffect(function () {
//     current.fn = fn;
//   }, [fn]);

//   return useCallback(function f(...args) {
//     if (!current.timer) {
//       current.timer = setTimeout(() => {
//         current.timer = null;
//       }, delay);
//       current.fn(...args);
//     }
//   }, dep);
// }

/**
 * set interval. rerender can't disturb t
 * imer.
 * @param fn 
 * @param ms 
 * @param dep 
 * @returns 
 */
function useInterval<T extends Function>(fn: T, ms: number, dep: any[] = []) {
  const ref = useRef<TimerCallback<T>>({ fn, timer: null })
  // refresh function on dependencies changed.
  useEffect(() => {
    ref.current.fn = fn
  }, [ref, dep, fn]);

  const clear = () => clearInterval(ref.current.timer!)
  
  useEffect(() => {
    // only generate once at first time
    let timer = setInterval(() => ref.current.fn(), ms);
    ref.current.timer = timer

    // clearInterval before destory
    return clear
  }, [ms])

  // return handler to caller
  return clear
}

/**
 * use localStorage wrap setState.
 * @param key 
 * @param initialValue 
 * @returns 
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) as T : initialValue
    } catch(e) {
      return initialValue
    }
  })
  const setLocalStorageState: Dispatch<SetStateAction<T>> = (newState) => {
    try {
      const newStateValue = typeof newState === 'function'
        // @ts-ignore
        ? newState(state)
        : newState;
      setState(newState)
      localStorage.setItem(key, JSON.stringify(newStateValue))
    } catch(e) {
      console.error(`Unable to store new value for ${key} in localStorage.`)
    }
  }
  return [state, setLocalStorageState]
}

function useTranslationPrefix(prefix: string, split = '.') {
  const { t, i18n } = useTranslation()
  const tt = (key: string) => t(prefix + split + key);
  return {
    t: tt,
    i18n,
  }
}

type RootState = ReturnType<typeof RootReducer>
const useSelector: TypedUseSelectorHook<RootState> = _useSeletor

export const hooks = {
  // useDebounce,
  // useThrottle,
  useInterval,
  useLocalStorage,
  useTranslationPrefix,
  useSelector,
}