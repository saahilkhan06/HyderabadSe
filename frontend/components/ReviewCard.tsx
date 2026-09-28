import Image from "next/image";

type Review = { customer: string; destination: string; text: string; date: string; verified?: boolean; photoUrl?: string };

export function ReviewCard({ review }: { review: Review }) {
  return <article className="card p-5">
    <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold">{review.customer}</p><p className="mt-1 text-xs text-ink/45">{review.destination} · {review.date}</p></div>{review.verified && <span className="rounded-full bg-moss/10 px-2.5 py-1 text-[10px] font-bold text-moss">Verified request</span>}</div>
    <p className="mt-5 text-sm leading-6 text-ink/65">{review.text}</p>
    {review.photoUrl && <Image src={review.photoUrl} alt="Approved customer-submitted review photograph" className="mt-4 h-40 w-full rounded-xl object-cover" loading="lazy" />}
  </article>;
}
