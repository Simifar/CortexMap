import type { ExamGuide } from '@/data';
import { ContentCard } from './ContentCard';
export function ExamCard({ exam }: { exam: ExamGuide }) {
  const type = exam.levelStatus === 'family' ? 'Серия экзаменов' : 'Отдельный экзамен';
  const scale = exam.scoreScale ? `${exam.scoreScale.min}–${exam.scoreScale.max} ${exam.scoreScale.unit}` : 'Шкала уточняется';
  return <ContentCard href={`/exams/${exam.slug}`} favoriteId={exam.id} eyebrow={`${type} · CEFR ${exam.cefrLevels.join('–')}`} title={exam.title} description={exam.description} tags={[...exam.tags, scale]} />;
}
