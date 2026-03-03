import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

// 1. 번역 함수(t)를 주입받아 번역된 배열을 반환하도록 수정
const getReviews = (t: any) => [
  {
    name: t('Jane Cooper'),
    title: t('Fabulous!'),
    text: t('Lightweight and hydrating — it feels more like a serum than sunscreen. My skin stays soft, calm, and comfortable all day.'),
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 5,
  },
  {
    name: t('Kathryn Murphy'),
    title: t('No Joke, So Gentle.'),
    text: t('My skin gets irritated easily, but this product feels very gentle and calming. It reduced redness overnight and didn\'t cause any breakouts. Perfect for sensitive skin.'),
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    stars: 5,
  },
  {
    name: t('Savannah Nguyen'),
    title: t('Glow Hits Different.'),
    text: t('The glow this gives is beautiful but natural — not greasy at all. It absorbs quickly and leaves my skin looking healthy and fresh. Great for everyday use.'),
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    stars: 5,
  },
  {
    name: t('Eleanor Pena'),
    title: t('Obsessed!!'),
    text: t('Super gentle on my skin and easy to wear every day. It layers perfectly under makeup without pilling.'),
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    stars: 5,
  },
  {
    name: t('Theresa Webb'),
    title: t('Literally So Good.'),
    text: t('This cleanser removes sunscreen and makeup residue really well without drying my skin. The oil is soft and creamy, and my face feels clean but balanced afterwards.'),
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 justify-center my-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ReturnType<typeof getReviews>[0] }) {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] self-stretch bg-white rounded-2xl shadow-md border border-[#F0F0EC] p-6 mx-3 flex flex-col items-center text-center">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-[#EEF2E0]"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=A9C356&color=fff`;
        }}
      />
      <StarRating count={review.stars} />
      
      <p className="text-sm text-[#111111] leading-relaxed mb-4">
        <span className="font-semibold">{review.title}</span>
        <br />
        {review.text}
      </p>
      
      <p className="mt-auto text-sm font-bold text-[#111111]">{review.name}</p>
    </div>
  );
}

export function BrandStory() {
  const { t } = useLanguage();

  // 2. 번역이 적용된 리뷰 리스트 생성
  const reviewList = getReviews(t);

  // Duplicate for seamless infinite loop
  const doubled = [...reviewList, ...reviewList, ...reviewList];

  return (
    <section id="story" className="relative py-24 overflow-hidden bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* 3. 정적 텍스트 번역 래핑 */}
          <span className="inline-block px-4 py-2 bg-[#EEF2E0] border border-[#A9C356]/30 rounded-full text-sm font-semibold mb-4 text-[#6F832E]">
            {t('제품리뷰')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">
            {t('실제 사용자들의 생생한 리뷰')}
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full py-6" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex items-stretch"
          style={{
            animation: 'marquee 35s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}