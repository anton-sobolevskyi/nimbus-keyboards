import { FC, Fragment } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { LogoMark } from '@/components/LogoMark';
import { cn } from '@/utils/cn';

/**
 * Props for `Marquee`.
 */
export type MarqueeProps = SliceComponentProps<Content.MarqueeSlice>;

/**
 * Component for "Marquee" Slices.
 */
const Marquee: FC<MarqueeProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={
          'relative flex w-full items-center overflow-hidden select-none'
        }
        aria-hidden={true}
        role={'presentation'}
      >
        <div className={'relative flex items-center whitespace-nowrap'}>
          <div
            className={cn('marquee-track animate-marquee flex', {
              '[animation-direction:reverse]':
                slice.primary.direction === 'Right',
            })}
          >
            <MarqueeContent phrases={slice.primary.phrases} />
            <MarqueeContent phrases={slice.primary.phrases} />
            <MarqueeContent phrases={slice.primary.phrases} />
            <MarqueeContent phrases={slice.primary.phrases} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;

type MarqueeContentProps = {
  phrases: Content.MarqueeSliceDefaultPrimaryPhrasesItem[];
};

const MarqueeContent = (props: MarqueeContentProps) => (
  <div className={'flex items-center bg-gray-200 py-10 whitespace-nowrap'}>
    {props.phrases.map((item, i) => (
      <Fragment key={i}>
        <div
          className={
            'font-bold-slanted px-14 text-[180px] leading-none text-gray-400/80 uppercase [text-box:trim-both_cap_alphabetic] md:text-[260px]'
          }
        >
          {item.text}
        </div>
        <LogoMark className={'size-36 shrink-0'} />
      </Fragment>
    ))}
  </div>
);
