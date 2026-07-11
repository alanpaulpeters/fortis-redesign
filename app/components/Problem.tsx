"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

import { getDict, type Locale } from "@/content/locales";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

export function Problem({ locale = "de" }: { locale?: Locale }) {
  const { statement, punchline } = getDict(locale).problem;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = statement.split(" ");
  const punchWords = punchline.split(" ");
  const total = words.length + punchWords.length;
  const step = 0.75 / total;

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[30px] font-medium leading-[1.35] tracking-[-0.02em] text-frost sm:text-[40px] lg:text-[46px]">
            {reduce ? (
              <>
                {statement} <span className="text-mint">{punchline}</span>
              </>
            ) : (
              <>
                {words.map((word, i) => (
                  <Word
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[i * step, i * step + step * 3]}
                  />
                ))}
                <span className="text-mint">
                  {punchWords.map((word, i) => (
                    <Word
                      key={i}
                      word={word}
                      progress={scrollYProgress}
                      range={[
                        (words.length + i) * step,
                        (words.length + i) * step + step * 3,
                      ]}
                    />
                  ))}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
