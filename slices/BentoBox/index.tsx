import { FC } from 'react';
import { Content } from '@prismicio/client';
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react';
import { Bounded } from '@/components/Bounded';
import { PrismicNextImage } from '@prismicio/next';
import { cn } from '@/utils/cn';
import { asText } from '@prismicio/client/richtext';
import { FadeIn } from '@/components/FadeIn';

/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>;

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn>
        <h2
          className={
            'font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl'
          }
        >
          <PrismicText field={slice.primary.heading} />
        </h2>
      </FadeIn>

      <FadeIn className="grid grid-cols-1 gap-4 md:grid-cols-6" targetChildren>
        {slice.primary.items.map((item) => (
          <BentoBoxItem item={item} key={asText(item.text)} />
        ))}
      </FadeIn>
    </Bounded>
  );
};

export default BentoBox;

type BentoBoxItemProps = {
  item: Content.BentoBoxSliceDefaultPrimaryItemsItem;
};

function BentoBoxItem(props: BentoBoxItemProps) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-3xl', {
        'md:col-span-2': props.item.size === 'Small',
        'md:col-span-3': props.item.size === 'Medium',
        'md:col-span-4': props.item.size === 'Large',
      })}
    >
      <PrismicNextImage
        field={props.item.image}
        className={'h-full w-full object-cover'}
        quality={96}
        width={700}
      />

      <div
        className={
          'absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-black'
        }
      ></div>
      <div
        className={
          'absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white'
        }
      >
        <PrismicRichText field={props.item.text} />
      </div>
    </div>
  );
}
