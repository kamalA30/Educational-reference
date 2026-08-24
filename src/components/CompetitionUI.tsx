"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CompetitionUI() {
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 1. تحديد موعد الانتهاء مباشرة هنا (السبت 29/08/2026 الساعة 12:00 ظهراً)
    const targetTime = new Date("2026-08-29T12:00:00+03:00").getTime();
    let intervalId: NodeJS.Timeout;

    // 2. دالة حساب الوقت المتبقي
    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      // إذا انتهى الوقت
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFinished(true);
        setLoading(false);
        if (intervalId) clearInterval(intervalId);
        return;
      }

      // تحديث العداد
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
      setLoading(false);
    };

    // 3. تشغيل الحساب فوراً عند تحميل المكون
    updateTimer();
    
    // 4. تحديث العداد كل ثانية
    intervalId = setInterval(updateTimer, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handlePayment = () => {
    alert("سيتم توجيهك إلى بوابة الدفع...");
  };

return (
  <div className="max-w-2xl mx-auto rounded-3xl bg-white shadow-xl border border-gray-100 p-8 my-12 relative z-10 w-full">
    
    {/* 1. العنوان والنص التوضيحي */}
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#B39055] mb-4">
      {isFinished ? "تم إعلان النتائج!" : "ترقبوا إعلان النتائج"}
    </h2>

    <p className="text-center text-gray-600 text-lg leading-relaxed font-medium mb-8 px-4">
      يسرّ المرجعيّة التربويّة الرسمية أن تشارككم لحظات الترّقُّب. نقترب من إعلان نتائج جهودكم ومثابرتكم في المسابقة التعليمية. استعدوا للانطلاق نحو مستقبل واعد ومتميّز.
    </p>

    {/* 2. التوقيت (العداد التنازلي - كُبِّر الحجم والخطوط) */}
    {loading ? (
      <div className="flex justify-center items-center h-28 gap-3 sm:gap-4 opacity-50 my-8">
        <div className="w-20 h-22 sm:w-28 sm:h-28 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="w-20 h-22 sm:w-28 sm:h-28 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="w-20 h-22 sm:w-28 sm:h-28 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="w-20 h-22 sm:w-28 sm:h-28 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    ) : isFinished ? (
      <div className="text-center text-2xl font-bold text-green-600 my-8">
        النتائج متاحة الآن!
      </div>
    ) : (
      <div className="flex justify-center items-center gap-2 sm:gap-4 my-8" dir="rtl">
        {[
          { label: "يوم", value: timeLeft.days },
          { label: "ساعة", value: timeLeft.hours },
          { label: "دقيقة", value: timeLeft.minutes },
          { label: "ثانية", value: timeLeft.seconds },
        ].map((unit, index) => (
          <div
            key={index}
            className="w-20 h-22 sm:w-28 sm:h-28 bg-[#FFF9EE] border-2 border-[#EAD0A3] rounded-2xl flex flex-col items-center justify-center shadow-md"
          >
            <span className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A]">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 font-bold mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    )}

    {/* 3. الشعار (صُغِّر الحجم والإطار) */}
    <div className="border border-[#B39055]/30 p-2.5 bg-white rounded-xl max-w-[160px] sm:max-w-[180px] mx-auto my-6 shadow-sm flex items-center justify-center min-h-[90px]">
      <Image
        src="/logo.png"
        alt="شعار المسابقة"
        width={180}
        height={90}
        className="w-full h-auto object-contain mx-auto"
        priority
      />
    </div>

    {/* 4. صندوق الدفع */}
    <div className="bg-[#FFF9EE] border border-[#EAD0A3] rounded-xl p-4 sm:p-6 my-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-5 transition-all mt-6">
      {/* تفاصيل النص ورقم الحساب */}
      <div className="text-center sm:text-right flex-1 space-y-3">
        <p className="text-[#8C6D3B] font-bold text-[15px] sm:text-[16px] leading-relaxed">
          ملاحظة: لعرض النتائج عند صدورها، يتطلب سداد رسوم إدارية قدرها{" "}
          <span className="text-[#1E3A8A] font-extrabold">10 شيكل</span>.
        </p>

        <p className="text-[#8C6D3B] text-[14px] font-medium leading-relaxed">
          يرجى تحويل المبلغ عبر{" "}
          <span className="font-bold text-gray-900">  </span>{" "}
         <span className="font-bold text-gray-900">بنك فلسطين</span>  الحساب التالي:
        </p>

        {/* رقم الحساب في المنتصف */}
        <div className="flex justify-center my-2">
          <div
            dir="ltr"
            className="inline-block bg-white px-5 py-2 rounded-lg border border-[#EAD0A3] font-mono font-bold text-[#1E3A8A] text-xl shadow-sm tracking-wider"
          >
            0567424913
          </div>
        </div>

        {/* التنويه بإشعار التحويل */}
        <p className="text-[#B45309] font-bold text-[13px] sm:text-[14px] leading-relaxed">
          ⚠️ تنبيه: يرجى الاحتفاظ بـ <span className="underline">إشعار/وصل التحويل</span> لتأكيد عملية الدفع عند الطلب.
        </p>
      </div>

      {/* زر إجراء العمليات */}

    </div>
  </div>
);
}
