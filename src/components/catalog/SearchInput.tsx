import { Search } from 'lucide-react';

type SearchInputProps = {
  defaultValue?: string;
  compact?: boolean;
};

export function SearchInput({ defaultValue = '', compact = false }: SearchInputProps) {
  if (compact) {
    return <div className="relative">
      <label htmlFor="header-search" className="sr-only">Поиск по справочнику</label>
      <input id="header-search" name="q" type="search" defaultValue={defaultValue} enterKeyHint="search" placeholder="Поиск по справочнику" className="h-11 w-full rounded-xl border border-border bg-background px-4 pr-12 text-base shadow-sm outline-none placeholder:text-muted-foreground/80 focus-visible:ring-2 focus-visible:ring-ring" />
      <button type="submit" aria-label="Найти" className="absolute right-1 top-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1">
        <Search aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>;
  }

  return <div className="sm:flex sm:gap-3">
    <label htmlFor="q" className="sr-only">Поисковый запрос</label>
    <input id="q" name="q" type="search" defaultValue={defaultValue} enterKeyHint="search" placeholder="Например: IELTS, TOEFL, B2 First" className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base shadow-sm outline-none placeholder:text-muted-foreground/80 focus-visible:ring-2 focus-visible:ring-ring" />
    <button type="submit" className="mt-3 min-h-12 w-full rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 sm:mt-0 sm:w-auto">Найти</button>
  </div>;
}
