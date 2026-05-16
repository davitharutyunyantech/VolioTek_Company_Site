import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

import { Footer } from './Footer';
import { Header } from './Header';
import { MotionReveal } from './MotionReveal';
import { SecurityMesh } from './SecurityMesh';

type Action = {
  href: string;
  label: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
};

type IconCardItem = {
  icon: LucideIcon;
  title: string;
  description?: string;
  body?: string;
  href?: string;
  cta?: string;
  tags?: string[];
};

type DetailItem = {
  title: string;
  body: string;
};

export function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight) {
    return text;
  }

  const start = text.indexOf(highlight);

  if (start === -1) {
    return text;
  }

  const before = text.slice(0, start);
  const after = text.slice(start + highlight.length);

  return (
    <>
      {before}
      <span className="text-[#18D6BD]">{highlight}</span>
      {after}
    </>
  );
}

export function PublicPageShell({
  children,
  jsonLd,
}: {
  children: ReactNode;
  jsonLd?: unknown;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </div>
  );
}

export function SectionIntro({
  title,
  description,
  align = 'left',
  dark = false,
}: {
  title: ReactNode;
  description: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
}) {
  return (
    <div className={align === 'center' ? 'mx-auto mb-16 max-w-3xl text-center' : 'mb-14 max-w-3xl'}>
      <MotionReveal
        as="h2"
        variant="heading"
        className={`text-4xl font-semibold lg:text-5xl ${dark ? 'text-[#F0FFFD]' : 'text-[#071625]'}`}
      >
        {title}
      </MotionReveal>
      <MotionReveal
        as="p"
        delay={90}
        variant="heading"
        className={`mt-6 text-xl leading-relaxed ${dark ? 'text-[#F0FFFD]/68' : 'text-gray-600'}`}
      >
        {description}
      </MotionReveal>
    </div>
  );
}

export function SplitSection({
  title,
  description,
  children,
  className = 'section-ambient--light bg-white',
  columns = 'lg:grid-cols-[0.9fr_1.1fr]',
}: {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  className?: string;
  columns?: string;
}) {
  return (
    <section className={`section-ambient relative overflow-hidden py-24 lg:py-32 ${className}`}>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`grid gap-12 lg:items-start ${columns}`}>
          <div>
            <SectionIntro title={title} description={description} />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  EyebrowIcon,
  title,
  description,
  children,
  gridClassName = 'lg:grid-cols-[1.05fr_0.95fr]',
  meshDensity = 'low',
  overlayClassName = 'from-transparent via-[#071625]/35 to-[#071625]',
}: {
  eyebrow: string;
  EyebrowIcon: LucideIcon;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  gridClassName?: string;
  meshDensity?: 'low' | 'medium' | 'high';
  overlayClassName?: string;
}) {
  return (
    <section className="section-ambient section-ambient--hero relative overflow-hidden bg-[#071625] pt-32 pb-20 lg:pt-40 lg:pb-28">
      <SecurityMesh density={meshDensity} glowColor="#18D6BD" />
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayClassName}`} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className={children ? `grid gap-12 lg:items-end ${gridClassName}` : undefined}>
          <div className="max-w-4xl">
            <MotionReveal mode="load" className="inline-flex items-center gap-2 rounded-full border border-[#18D6BD]/20 bg-[#0B2233]/60 px-4 py-2">
              <EyebrowIcon className="h-4 w-4 text-[#18D6BD]" />
              <span className="text-sm text-[#18D6BD]">{eyebrow}</span>
            </MotionReveal>

            <MotionReveal
              as="h1"
              mode="load"
              delay={90}
              className="mt-8 max-w-4xl text-5xl font-semibold leading-tight text-[#F0FFFD] lg:text-6xl xl:text-7xl"
            >
              {title}
            </MotionReveal>

            <MotionReveal
              as="p"
              mode="load"
              delay={180}
              className="mt-6 max-w-2xl text-xl leading-relaxed text-[#F0FFFD]/70 lg:text-2xl"
            >
              {description}
            </MotionReveal>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

export function HeroPanel({
  icon: Icon,
  title,
  description,
  action,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  action?: Action;
  children?: ReactNode;
}) {
  return (
    <MotionReveal
      mode="load"
      delay={270}
      variant="panel"
      className="motion-panel rounded-lg border border-[#18D6BD]/24 bg-[#0B2233]/72 p-6 shadow-2xl shadow-black/20 backdrop-blur"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#18D6BD]/10">
        <Icon className="h-6 w-6 text-[#18D6BD]" />
      </div>
      <h2 className="text-2xl font-semibold text-[#F0FFFD]">{title}</h2>
      {description ? <p className="mt-4 leading-relaxed text-[#F0FFFD]/68">{description}</p> : null}
      {children}
      {action ? <ActionLink action={action} className="mt-8 px-6 py-3 shadow-lg shadow-[#18D6BD]/20" /> : null}
    </MotionReveal>
  );
}

export function ActionLink({
  action,
  className,
}: {
  action: Action;
  className?: string;
}) {
  const variant = action.variant ?? 'primary';
  const Icon = action.icon ?? (variant === 'primary' ? ArrowRight : undefined);
  const defaultClassName =
    variant === 'primary'
      ? 'px-8 py-4 shadow-xl shadow-[#18D6BD]/30'
      : 'px-8 py-4';
  const mergedClassName = className ?? defaultClassName;

  return (
    <Link
      href={action.href}
      className={
        variant === 'primary'
          ? `premium-button inline-flex items-center justify-center rounded-lg bg-[#18D6BD] text-[#071625] transition-all duration-200 hover:bg-[#35EAD0] ${mergedClassName}`
          : `inline-flex items-center justify-center gap-2 rounded-lg border border-[#18D6BD]/30 text-[#F0FFFD]/78 transition-colors hover:text-[#18D6BD] ${mergedClassName}`
      }
    >
      {variant === 'secondary' && Icon ? <Icon className="h-5 w-5 text-[#18D6BD]" /> : null}
      {action.label}
      {variant === 'primary' && Icon ? <Icon className="ml-2 h-5 w-5" /> : null}
    </Link>
  );
}

export function IconCardGrid({
  items,
  columns = 'md:grid-cols-3',
  dark = false,
  largeTitle = false,
}: {
  items: IconCardItem[];
  columns?: string;
  dark?: boolean;
  largeTitle?: boolean;
}) {
  return (
    <div className={`grid gap-8 ${columns}`}>
      {items.map((item, index) => (
        <MotionReveal
          key={item.title}
          delay={index * 85}
          variant="card"
          className={
            dark
              ? 'motion-card motion-card--dark rounded-lg border border-[#18D6BD]/18 bg-[#0B2233]/62 p-8 transition-all duration-300'
              : 'motion-card rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#18D6BD]/50'
          }
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#18D6BD]/10">
            <item.icon className={`h-6 w-6 ${dark ? 'text-[#18D6BD]' : 'text-[#07988D]'}`} />
          </div>
          <h3 className={`mb-3 font-semibold ${largeTitle ? 'text-2xl' : 'text-xl'} ${dark ? 'text-[#F0FFFD]' : 'text-[#071625]'}`}>
            {item.title}
          </h3>
          <p className={`leading-relaxed ${dark ? 'text-[#F0FFFD]/66' : 'text-gray-600'} ${item.href ? 'mb-6' : ''}`}>
            {item.description ?? item.body}
          </p>
          {item.tags ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-lg border border-[#18D6BD]/20 bg-[#EDFAFA] px-3 py-1.5 text-sm text-[#0B1F2C]">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {item.href && item.cta ? (
            <Link href={item.href} className="inline-flex items-center text-[#07988D] transition-colors hover:text-[#071625]">
              {item.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          ) : null}
        </MotionReveal>
      ))}
    </div>
  );
}

export function Checklist({
  items,
  Icon,
}: {
  items: string[];
  Icon: LucideIcon;
}) {
  return (
    <MotionReveal delay={160} variant="panel" className="grid gap-4">
      {items.map((item) => (
        <div key={item} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm shadow-[#071625]/5">
          <Icon className="mt-1 h-5 w-5 shrink-0 text-[#07988D]" />
          <p className="leading-relaxed text-gray-700">{item}</p>
        </div>
      ))}
    </MotionReveal>
  );
}

export function DetailList({
  items,
  Icon,
}: {
  items: DetailItem[];
  Icon: LucideIcon;
}) {
  return (
    <MotionReveal delay={160} variant="panel" className="grid gap-4">
      {items.map((item) => (
        <article key={item.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-[#071625]/5">
          <div className="mb-4 flex items-center gap-3">
            <Icon className="h-5 w-5 shrink-0 text-[#07988D]" />
            <h3 className="text-xl font-semibold text-[#071625]">{item.title}</h3>
          </div>
          <p className="leading-relaxed text-gray-600">{item.body}</p>
        </article>
      ))}
    </MotionReveal>
  );
}

export function FinalCta({
  title,
  description,
  primaryAction,
  secondaryAction,
  secondarySlot,
}: {
  title: ReactNode;
  description: ReactNode;
  primaryAction: Action;
  secondaryAction?: Action;
  secondarySlot?: ReactNode;
}) {
  return (
    <section className="section-ambient section-ambient--cta relative overflow-hidden bg-[#071625] py-24 lg:py-32">
      <SecurityMesh density="low" glowColor="#18D6BD" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <MotionReveal as="h2" variant="heading" className="text-4xl font-semibold text-[#F0FFFD] lg:text-5xl">
          {title}
        </MotionReveal>
        <MotionReveal as="p" delay={90} variant="heading" className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-[#F0FFFD]/70">
          {description}
        </MotionReveal>

        <MotionReveal delay={180} variant="panel" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ActionLink action={primaryAction} />
          {secondaryAction ? <ActionLink action={secondaryAction} /> : null}
          {secondarySlot}
        </MotionReveal>
      </div>
    </section>
  );
}
