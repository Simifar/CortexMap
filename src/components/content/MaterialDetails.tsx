import type { Resource, Textbook } from '@/data';
const registrationLabels = { yes: 'Нужна регистрация', no: 'Регистрация не нужна', unknown: 'Необходимость регистрации уточняется' };
export function MaterialDetails({ material }: { material: Resource | Textbook }) {
  return <section className="mt-6 space-y-3 text-sm text-muted-foreground" aria-label="Условия использования">
    <p>{registrationLabels[material.registration]}</p>
    {material.audience && <p><strong className="text-foreground">Кому подойдёт: </strong>{material.audience}</p>}
    {material.howToUse && <p><strong className="text-foreground">Как использовать: </strong>{material.howToUse}</p>}
    {material.limitations && material.limitations.length > 0 && <ul className="list-disc pl-5">{material.limitations.map(item => <li key={item}>{item}</li>)}</ul>}
    <ReviewStatus item={material} />
  </section>;
}
export function ReviewStatus({ item }: { item: { reviewStatus: 'pending' | 'verified'; verifiedAt: string | null; linkCheckedAt: string | null } }) {
  return <p className="text-sm text-muted-foreground">{item.reviewStatus === 'verified' ? 'Содержание проверено редакцией: ' + item.verifiedAt + '.' : 'Содержание ожидает редакционной проверки.'}{item.linkCheckedAt ? ' Официальная ссылка проверена: ' + item.linkCheckedAt + '.' : ''}</p>;
}
