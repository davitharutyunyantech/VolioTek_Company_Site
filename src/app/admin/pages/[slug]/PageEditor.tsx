'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Archive, ArrowDown, ArrowUp, EyeOff, Plus, RotateCcw, Save, Trash2, UploadCloud } from 'lucide-react';

import { adminJsonHeaders, adminMutationHeaders } from '@/lib/admin/csrf';
import type { EditablePage } from '@/lib/content/store';
import type { GenericPageContent, HomeContent } from '@/lib/content/schemas';

type Action = HomeContent['hero']['primaryAction'];
type CardSection = 'capabilities' | 'security' | 'useCases';

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#18D6BD]"
      />
    </label>
  );
}

function TextArea({
  id,
  label,
  value,
  rows = 4,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#18D6BD]"
      />
    </label>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

function ActionFields({
  idPrefix,
  title,
  action,
  onChange,
}: {
  idPrefix: string;
  title: string;
  action: Action;
  onChange: (action: Action) => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-[#F8FCFC] p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field
          id={`${idPrefix}-label`}
          label="Label"
          value={action.label}
          onChange={(label) => onChange({ ...action, label })}
        />
        <Field
          id={`${idPrefix}-href`}
          label="Link"
          value={action.href}
          onChange={(href) => onChange({ ...action, href })}
        />
      </div>
    </div>
  );
}

export function PageEditor({ page }: { page: EditablePage }) {
  const router = useRouter();
  const isHome = page.slug === 'home';
  const isArchived = page.status === 'ARCHIVED';
  const [title, setTitle] = useState(page.metadata.title);
  const [description, setDescription] = useState(page.metadata.description);
  const [canonical, setCanonical] = useState(page.metadata.canonical);
  const [homeContent, setHomeContent] = useState(page.content as HomeContent);
  const [genericContent, setGenericContent] = useState(page.content as GenericPageContent);
  const [contentJson, setContentJson] = useState(JSON.stringify(page.content, null, 2));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  const isGeneric = !isHome && typeof genericContent?.headline === 'string' && Array.isArray(genericContent.sections);

  const contentError = useMemo(() => {
    if (isHome || isGeneric) {
      return '';
    }

    try {
      JSON.parse(contentJson);
      return '';
    } catch (parseError) {
      return parseError instanceof Error ? parseError.message : 'Invalid JSON';
    }
  }, [contentJson, isGeneric, isHome]);

  function updateHome(next: HomeContent) {
    setHomeContent(next);
  }

  function updateHero<K extends keyof HomeContent['hero']>(key: K, value: HomeContent['hero'][K]) {
    updateHome({ ...homeContent, hero: { ...homeContent.hero, [key]: value } });
  }

  function updateFinalCta<K extends keyof HomeContent['finalCta']>(key: K, value: HomeContent['finalCta'][K]) {
    updateHome({ ...homeContent, finalCta: { ...homeContent.finalCta, [key]: value } });
  }

  function updateTextSection<K extends CardSection | 'process'>(
    section: K,
    key: 'title' | 'description' | 'eyebrow' | 'highlightedTitle',
    value: string,
  ) {
    updateHome({
      ...homeContent,
      [section]: {
        ...homeContent[section],
        [key]: value,
      },
    });
  }

  function updateMetric(index: number, key: 'value' | 'label', value: string) {
    const metrics = homeContent.hero.metrics.map((metric, metricIndex) =>
      metricIndex === index ? { ...metric, [key]: value } : metric,
    );
    updateHero('metrics', metrics);
  }

  function updateCard(section: CardSection, index: number, key: 'icon' | 'title' | 'description' | 'highlights', value: string) {
    const items = homeContent[section].items.map((item, itemIndex) => {
      if (itemIndex !== index) {
        return item;
      }

      if (key === 'highlights') {
        return {
          ...item,
          highlights: value
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
        };
      }

      return { ...item, [key]: value };
    });

    updateHome({ ...homeContent, [section]: { ...homeContent[section], items } });
  }

  function updateStep(index: number, key: 'icon' | 'number' | 'title' | 'description', value: string) {
    const steps = homeContent.process.steps.map((step, stepIndex) =>
      stepIndex === index ? { ...step, [key]: value } : step,
    );
    updateHome({ ...homeContent, process: { ...homeContent.process, steps } });
  }

  function updateGeneric<K extends keyof GenericPageContent>(key: K, value: GenericPageContent[K]) {
    setGenericContent({ ...genericContent, [key]: value });
  }

  function updateGenericSection(index: number, key: 'title' | 'body', value: string) {
    updateGeneric(
      'sections',
      genericContent.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [key]: value } : section,
      ),
    );
  }

  function addGenericSection() {
    updateGeneric('sections', [...genericContent.sections, { title: 'New section', body: 'Add section content here.' }]);
  }

  function removeGenericSection(index: number) {
    updateGeneric(
      'sections',
      genericContent.sections.filter((_, sectionIndex) => sectionIndex !== index),
    );
  }

  function moveGenericSection(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= genericContent.sections.length) {
      return;
    }

    const sections = [...genericContent.sections];
    const current = sections[index];
    sections[index] = sections[nextIndex];
    sections[nextIndex] = current;
    updateGeneric('sections', sections);
  }

  async function request(path: string, init?: RequestInit) {
    setError('');
    setMessage('');
    setIsWorking(true);

    const response = await fetch(path, init);
    const body = (await response.json().catch(() => null)) as { error?: string } | null;

    setIsWorking(false);

    if (!response.ok) {
      setError(body?.error ?? 'Request failed.');
      return false;
    }

    router.refresh();
    return true;
  }

  async function saveDraft() {
    if (isArchived) {
      setError('Restore this page before editing.');
      return;
    }

    if (contentError) {
      setError(`Content JSON is invalid: ${contentError}`);
      return;
    }

    const ok = await request(`/api/admin/pages/${page.slug}`, {
      method: 'PUT',
      headers: adminJsonHeaders(),
      body: JSON.stringify({
        metadata: { title, description, canonical },
        content: isHome ? homeContent : isGeneric ? genericContent : JSON.parse(contentJson),
      }),
    });

    if (ok) {
      setMessage('Draft saved.');
    }
  }

  async function action(name: 'publish' | 'unpublish' | 'archive' | 'restore') {
    const ok = await request(`/api/admin/pages/${page.slug}/${name}`, { method: 'POST', headers: adminMutationHeaders() });

    if (ok) {
      setMessage(`${name[0].toUpperCase()}${name.slice(1)} complete.`);
    }
  }

  return (
    <div className="grid gap-8">
      <Panel title="SEO metadata">
        {isArchived ? (
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            This page is archived. Restore it before editing or publishing.
          </p>
        ) : null}
        <Field id="metadata-title" label="Title" value={title} onChange={setTitle} />
        <TextArea id="metadata-description" label="Description" value={description} rows={5} onChange={setDescription} />
        <Field id="metadata-canonical" label="Canonical path" value={canonical} onChange={setCanonical} />
      </Panel>

      {isHome ? (
        <>
          <Panel title="Hero">
            <Field id="hero-eyebrow" label="Eyebrow" value={homeContent.hero.eyebrow} onChange={(value) => updateHero('eyebrow', value)} />
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="hero-title" label="Title" value={homeContent.hero.title} onChange={(value) => updateHero('title', value)} />
              <Field id="hero-highlighted-title" label="Highlighted title" value={homeContent.hero.highlightedTitle} onChange={(value) => updateHero('highlightedTitle', value)} />
            </div>
            <TextArea id="hero-description" label="Description" value={homeContent.hero.description} onChange={(value) => updateHero('description', value)} />
            <div className="grid gap-5 md:grid-cols-2">
              <ActionFields idPrefix="hero-primary" title="Primary action" action={homeContent.hero.primaryAction} onChange={(actionValue) => updateHero('primaryAction', actionValue)} />
              <ActionFields idPrefix="hero-secondary" title="Secondary action" action={homeContent.hero.secondaryAction} onChange={(actionValue) => updateHero('secondaryAction', actionValue)} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {homeContent.hero.metrics.map((metric, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-[#F8FCFC] p-4">
                  <h3 className="font-semibold">Metric {index + 1}</h3>
                  <div className="mt-4 grid gap-4">
                    <Field id={`metric-${index}-value`} label="Value" value={metric.value} onChange={(value) => updateMetric(index, 'value', value)} />
                    <Field id={`metric-${index}-label`} label="Label" value={metric.label} onChange={(value) => updateMetric(index, 'label', value)} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <CardSectionEditor title="Capabilities" section="capabilities" content={homeContent} updateTextSection={updateTextSection} updateCard={updateCard} />
          <CardSectionEditor title="Security" section="security" content={homeContent} updateTextSection={updateTextSection} updateCard={updateCard} />

          <Panel title="Process">
            <Field id="process-title" label="Title" value={homeContent.process.title} onChange={(value) => updateTextSection('process', 'title', value)} />
            <TextArea id="process-description" label="Description" value={homeContent.process.description} onChange={(value) => updateTextSection('process', 'description', value)} />
            <div className="grid gap-5 md:grid-cols-2">
              {homeContent.process.steps.map((step, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-[#F8FCFC] p-4">
                  <h3 className="font-semibold">Step {index + 1}</h3>
                  <div className="mt-4 grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field id={`step-${index}-number`} label="Number" value={step.number} onChange={(value) => updateStep(index, 'number', value)} />
                      <Field id={`step-${index}-icon`} label="Icon key" value={step.icon} onChange={(value) => updateStep(index, 'icon', value)} />
                    </div>
                    <Field id={`step-${index}-title`} label="Title" value={step.title} onChange={(value) => updateStep(index, 'title', value)} />
                    <TextArea id={`step-${index}-description`} label="Description" value={step.description} onChange={(value) => updateStep(index, 'description', value)} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <CardSectionEditor title="Use cases" section="useCases" content={homeContent} updateTextSection={updateTextSection} updateCard={updateCard} />

          <Panel title="Final CTA">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="final-cta-title" label="Title" value={homeContent.finalCta.title} onChange={(value) => updateFinalCta('title', value)} />
              <Field id="final-cta-highlighted-title" label="Highlighted title" value={homeContent.finalCta.highlightedTitle} onChange={(value) => updateFinalCta('highlightedTitle', value)} />
            </div>
            <TextArea id="final-cta-description" label="Description" value={homeContent.finalCta.description} onChange={(value) => updateFinalCta('description', value)} />
            <div className="grid gap-5 md:grid-cols-2">
              <ActionFields idPrefix="final-primary" title="Primary action" action={homeContent.finalCta.primaryAction} onChange={(actionValue) => updateFinalCta('primaryAction', actionValue)} />
              <ActionFields idPrefix="final-secondary" title="Secondary action" action={homeContent.finalCta.secondaryAction} onChange={(actionValue) => updateFinalCta('secondaryAction', actionValue)} />
            </div>
          </Panel>
        </>
      ) : isGeneric ? (
        <GenericPageEditor
          content={genericContent}
          updateGeneric={updateGeneric}
          updateGenericSection={updateGenericSection}
          addGenericSection={addGenericSection}
          removeGenericSection={removeGenericSection}
          moveGenericSection={moveGenericSection}
        />
      ) : (
        <Panel title="Structured content">
          <p className="text-sm text-gray-600">Unsupported content shape. Use JSON only as a developer fallback.</p>
          <textarea
            value={contentJson}
            onChange={(event) => setContentJson(event.target.value)}
            rows={24}
            spellCheck={false}
            className="w-full rounded-lg border border-gray-300 bg-[#071625] px-4 py-3 font-mono text-sm leading-6 text-[#F0FFFD] outline-none focus:border-[#18D6BD]"
          />
          {contentError ? <p className="text-sm text-red-700">{contentError}</p> : null}
        </Panel>
      )}

      <div>
        {error ? <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="mb-4 rounded-lg bg-[#EDFAFA] px-4 py-3 text-sm text-[#071625]">{message}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={saveDraft} disabled={isWorking} className="inline-flex items-center gap-2 rounded-lg bg-[#18D6BD] px-5 py-3 font-semibold text-[#071625] transition hover:bg-[#35EAD0] disabled:opacity-60">
            <Save className="h-4 w-4" />
            Save draft
          </button>
          {isArchived ? (
            <button type="button" onClick={() => action('restore')} disabled={isWorking} className="inline-flex items-center gap-2 rounded-lg bg-[#071625] px-5 py-3 font-semibold text-[#F0FFFD] transition hover:bg-[#0B2233] disabled:opacity-60">
              <RotateCcw className="h-4 w-4" />
              Restore
            </button>
          ) : (
            <>
              <button type="button" onClick={() => action('publish')} disabled={isWorking} className="inline-flex items-center gap-2 rounded-lg bg-[#071625] px-5 py-3 font-semibold text-[#F0FFFD] transition hover:bg-[#0B2233] disabled:opacity-60">
                <UploadCloud className="h-4 w-4" />
                Publish
              </button>
              <button type="button" onClick={() => action('unpublish')} disabled={isWorking} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-semibold transition hover:border-[#18D6BD] disabled:opacity-60">
                <EyeOff className="h-4 w-4" />
                Unpublish
              </button>
              <button type="button" onClick={() => action('archive')} disabled={isWorking} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60">
                <Archive className="h-4 w-4" />
                Archive
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CardSectionEditor({
  title,
  section,
  content,
  updateTextSection,
  updateCard,
}: {
  title: string;
  section: CardSection;
  content: HomeContent;
  updateTextSection: (section: CardSection | 'process', key: 'title' | 'description' | 'eyebrow' | 'highlightedTitle', value: string) => void;
  updateCard: (section: CardSection, index: number, key: 'icon' | 'title' | 'description' | 'highlights', value: string) => void;
}) {
  const sectionContent = content[section];

  return (
    <Panel title={title}>
      {'eyebrow' in sectionContent ? (
        <Field id={`${section}-eyebrow`} label="Eyebrow" value={sectionContent.eyebrow} onChange={(value) => updateTextSection(section, 'eyebrow', value)} />
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        <Field id={`${section}-title`} label="Title" value={sectionContent.title} onChange={(value) => updateTextSection(section, 'title', value)} />
        {'highlightedTitle' in sectionContent ? (
          <Field id={`${section}-highlighted-title`} label="Highlighted title" value={sectionContent.highlightedTitle} onChange={(value) => updateTextSection(section, 'highlightedTitle', value)} />
        ) : null}
      </div>
      <TextArea id={`${section}-description`} label="Description" value={sectionContent.description} onChange={(value) => updateTextSection(section, 'description', value)} />
      <div className="grid gap-5 md:grid-cols-2">
        {sectionContent.items.map((item, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-[#F8FCFC] p-4">
            <h3 className="font-semibold">Card {index + 1}</h3>
            <div className="mt-4 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field id={`${section}-${index}-icon`} label="Icon key" value={item.icon} onChange={(value) => updateCard(section, index, 'icon', value)} />
                <Field id={`${section}-${index}-title`} label="Title" value={item.title} onChange={(value) => updateCard(section, index, 'title', value)} />
              </div>
              <TextArea id={`${section}-${index}-description`} label="Description" value={item.description} onChange={(value) => updateCard(section, index, 'description', value)} />
              {'highlights' in item ? (
                <TextArea
                  id={`${section}-${index}-highlights`}
                  label="Highlights, one per line"
                  value={(item.highlights ?? []).join('\n')}
                  onChange={(value) => updateCard(section, index, 'highlights', value)}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function GenericPageEditor({
  content,
  updateGeneric,
  updateGenericSection,
  addGenericSection,
  removeGenericSection,
  moveGenericSection,
}: {
  content: GenericPageContent;
  updateGeneric: <K extends keyof GenericPageContent>(key: K, value: GenericPageContent[K]) => void;
  updateGenericSection: (index: number, key: 'title' | 'body', value: string) => void;
  addGenericSection: () => void;
  removeGenericSection: (index: number) => void;
  moveGenericSection: (index: number, direction: -1 | 1) => void;
}) {
  return (
    <>
      <Panel title="Hero content">
        <Field
          id="generic-headline"
          label="Headline"
          value={content.headline}
          onChange={(value) => updateGeneric('headline', value)}
        />
        <TextArea
          id="generic-description"
          label="Description"
          value={content.description}
          rows={5}
          onChange={(value) => updateGeneric('description', value)}
        />
      </Panel>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Page sections</h2>
            <p className="mt-1 text-sm text-gray-600">Edit the published body sections in the order they appear on the page.</p>
          </div>
          <button
            type="button"
            onClick={addGenericSection}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#071625] px-4 py-2 text-sm font-semibold text-[#F0FFFD] transition hover:bg-[#0B2233]"
          >
            <Plus className="h-4 w-4" />
            Add section
          </button>
        </div>

        <div className="mt-6 grid gap-5">
          {content.sections.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-[#F8FCFC] p-6 text-sm text-gray-600">
              No sections yet. Add a section to create editable page body content.
            </div>
          ) : null}

          {content.sections.map((section, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-[#F8FCFC] p-4">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold">Section {index + 1}</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveGenericSection(index, -1)}
                    disabled={index === 0}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:border-[#18D6BD] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Move section up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveGenericSection(index, 1)}
                    disabled={index === content.sections.length - 1}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:border-[#18D6BD] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Move section down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeGenericSection(index)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-700 transition hover:bg-red-50"
                    aria-label="Remove section"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                <Field
                  id={`generic-section-${index}-title`}
                  label="Title"
                  value={section.title}
                  onChange={(value) => updateGenericSection(index, 'title', value)}
                />
                <TextArea
                  id={`generic-section-${index}-body`}
                  label="Body"
                  value={section.body}
                  rows={6}
                  onChange={(value) => updateGenericSection(index, 'body', value)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
