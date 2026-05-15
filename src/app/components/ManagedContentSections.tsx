import { FileText } from 'lucide-react';

import type { GenericPageContent } from '@/lib/content/schemas';
import { DetailList, SplitSection } from './PublicPageBlocks';

export function ManagedContentSections({
  content,
  fallbackTitle = 'Page details',
  fallbackDescription = 'Review the current information managed for this page.',
}: {
  content: GenericPageContent;
  fallbackTitle?: string;
  fallbackDescription?: string;
}) {
  if (content.sections.length === 0) {
    return null;
  }

  return (
    <SplitSection
      title={fallbackTitle}
      description={fallbackDescription}
      className="section-ambient--soft bg-[#EDFAFA]"
      columns="lg:grid-cols-[0.85fr_1.15fr]"
    >
      <DetailList items={content.sections} Icon={FileText} />
    </SplitSection>
  );
}
