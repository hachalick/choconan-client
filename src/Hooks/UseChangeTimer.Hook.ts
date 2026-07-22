"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useChangeTimer(
  func: () => Promise<boolean>,
  deps?: React.DependencyList,
  timer: number = 1000
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [saveChange, setSaveChange] = useState(false);
  const [cloud, setCloud] = useState(true);
  const [time, setTime] = useState<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(time);
    setSaveChange(false);
    saveChange && setCloud(false);
    return setTime(
      setTimeout(async () => {
        if (saveChange) {
          const res = await func();
          setSaveChange(res);
          setCloud(res);
        }
      }, timer)
    );
  }, deps);

  return [cloud, setSaveChange];
}
