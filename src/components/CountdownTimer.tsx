"use client";

import { useEffect, useState, useCallback } from "react";

export default function CountdownTimer({ onComplete }: { onComplete: () => void }) {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const syncTime = useCallback(async () => {
    try {
      const res = await fetch("/api/countdown", { cache: "no-store" });
      const data = await res.json();
      
      const { serverNowTime, serverTargetTime } = data;
      const diff = serverTargetTime - serverNowTime;
      
      if (diff <= 0) {
        setRemainingTime(0);
        onComplete();
      } else {
        setRemainingTime(diff);
      }
    } catch (error) {
      console.error("فشل في مزامنة توقيت السيرفر:", error);
    }
  }, [onComplete]);

  useEffect(() => {
    syncTime();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncTime();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [syncTime]);

  useEffect(() => {
    if (remainingTime === null || remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null) return null;
        if (prev <= 1000) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, onComplete]);

  if (remainingTime === null) {
    return (
      <div className="flex justify-center items-center h-24 space-x-4 space-x-reverse opacity-50 my-8">
        <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" />
        <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" />
        <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" />
        <div className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (remainingTime <= 0) return null;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="w-20 h-20 bg-[#FFF9EE] border border-[#EAD0A3] rounded-xl flex flex-col items-center justify-center shadow-sm">
      <span className="text-2xl font-bold text-[#1E3A8A]">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs text-gray-500 font-medium mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center space-x-4 space-x-reverse my-8" dir="rtl">
      <TimeBox value={days} label="يوم" />
      <TimeBox value={hours} label="ساعة" />
      <TimeBox value={minutes} label="دقيقة" />
      <TimeBox value={seconds} label="ثانية" />
    </div>
  );
}