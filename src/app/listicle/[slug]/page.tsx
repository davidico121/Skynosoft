import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listiclePitches } from "@/lib/listicle";

export const dynamicParams = false;

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[720px] px-5 ${className}`}>{children}</div>;
}

export function generateStaticParams() {
  return listiclePitches.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pitch = listiclePitches.find((p) => p.slug === slug);
  if (!pitch) return {};
  return {
    title: pitch.meta.title,
    description: pitch.meta.description,
    robots: { index: false, follow: false },
  };
}

export default async function ListiclePitchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pitch = listiclePitches.find((p) => p.slug === slug);
  if (!pitch) return null;

  const { hook, teaserList, pressBar, sections, ctaLabel, bonus, productBlock, testimonials, closing, productUrl, accentColor } = pitch;

  const CtaLink = ({ className = "" }: { className?: string }) => (
    <Link
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline underline-offset-2 ${className}`}
      style={{ color: accentColor }}
    >
      {ctaLabel}
    </Link>
  );

  return (
    <main className="bg-white font-body text-[#1a1a1a]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <Wrap className="py-10">
        <h1 className="font-bold leading-tight text-balance" style={{ fontSize: "28px" }}>
          {hook.headline}
        </h1>
        <p className="mt-3 text-sm text-[#777]">{hook.byline}</p>

        <figure className="mt-6">
          <Image
            src={hook.hero.src}
            alt={hook.hero.alt}
            width={hook.hero.width}
            height={hook.hero.height}
            priority
            className="h-auto w-full rounded"
          />
        </figure>

        <div className="mt-8 space-y-3">
          {teaserList.map((line, i) => (
            <p key={i} className="text-lg leading-relaxed">
              {i + 1}. {line}
            </p>
          ))}
        </div>
        <CtaLink className="mt-4 inline-block text-lg font-semibold" />

        {pressBar && pressBar.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-10 border-y border-[#eee] py-8">
            {pressBar.map((p) =>
              p.logo ? (
                <Image
                  key={p.name}
                  src={p.logo.src}
                  alt={p.name}
                  width={p.logo.width}
                  height={p.logo.height}
                  className="h-7 w-auto opacity-80 grayscale"
                />
              ) : (
                <span key={p.name} className="font-sans text-xl font-semibold text-[#999]">
                  {p.name}
                </span>
              ),
            )}
          </div>
        )}

        {sections.map((section) => (
          <div key={section.number} className="mt-14">
            {section.image && (
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={section.image.width}
                height={section.image.height}
                className="h-auto w-full rounded"
              />
            )}
            <h2 className="mt-6 text-2xl font-bold">
              {section.number}. {section.title}
            </h2>
            <div className="mt-3 space-y-3 text-lg leading-relaxed text-[#2a2a2a]">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <CtaLink className="mt-4 inline-block text-lg font-semibold" />
          </div>
        ))}

        {bonus && (
          <figure className="relative mt-14">
            <Image
              src={bonus.image.src}
              alt={bonus.image.alt}
              width={bonus.image.width}
              height={bonus.image.height}
              className="h-auto w-full rounded"
            />
            <span
              className="absolute right-4 top-4 flex h-24 w-24 -rotate-6 items-center justify-center rounded-full text-center font-sans text-xs font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {bonus.label}
            </span>
          </figure>
        )}

        <div className="mt-14 border-t border-[#eee] pt-10">
          {productBlock.image && (
            <Image
              src={productBlock.image.src}
              alt={productBlock.image.alt}
              width={productBlock.image.width}
              height={productBlock.image.height}
              className="h-auto w-full rounded"
            />
          )}
          <h2 className="mt-6 font-sans text-2xl font-bold">{productBlock.headline}</h2>
          <p className="mt-1 font-sans text-lg text-[#555]">{productBlock.subheadline}</p>
          <p className="mt-4 font-sans text-base leading-relaxed text-[#333]">{productBlock.description}</p>

          <div className="mt-6 space-y-6">
            {productBlock.featureGroups.map((group) => (
              <div key={group.heading}>
                <p className="font-sans text-sm font-bold uppercase tracking-wide text-[#999]">{group.heading}</p>
                <ul className="mt-2 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="font-sans text-base text-[#333]">
                      &bull; {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {productBlock.ratingValue && (
            <p className="mt-6 font-sans text-base">
              <span style={{ color: accentColor }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>{" "}
              {productBlock.ratingCount} ratings
            </p>
          )}

          <Link
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-sans text-base font-bold underline underline-offset-2"
            style={{ color: accentColor }}
          >
            {productBlock.shopCtaLabel}
          </Link>
        </div>

        {testimonials.length > 0 && (
          <div className="mt-14">
            <h2 className="font-sans text-2xl font-bold">What real customers say</h2>
            <div className="mt-6 space-y-8">
              {testimonials.map((t, i) => (
                <div key={i}>
                  <p className="font-sans text-sm font-semibold">
                    {t.name} &mdash; {t.role}
                  </p>
                  <p style={{ color: accentColor }} className="mt-1 text-lg">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </p>
                  <p className="mt-1 font-sans text-base leading-relaxed text-[#333]">{t.quote}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-[#eee] pt-10 text-center">
          <h2 className="font-sans text-2xl font-bold">{closing.headline}</h2>
          <Link
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-sans text-lg font-bold underline underline-offset-2"
            style={{ color: accentColor }}
          >
            {closing.ctaLabel}
          </Link>
        </div>

        <p className="mt-16 border-t border-[#eee] py-6 text-center font-sans text-xs text-[#999]">
          Concept page built by Skynosoft as a sample of real, deployable advertorial work.
          Not affiliated with or published by {pitch.brand}.
        </p>
      </Wrap>
    </main>
  );
}
