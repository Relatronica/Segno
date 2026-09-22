'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { LobbyPerson } from '@/lib/data/trasparenza';

type Props = {
  person: Pick<LobbyPerson, 'name' | 'shortName' | 'avatar'>;
  size?: 'sm' | 'md';
  className?: string;
};

const SIZE = {
  sm: 'h-6 w-6 text-[9px]',
  md: 'h-7 w-7 text-[10px]',
} as const;

export function PersonAvatar({ person, size = 'sm', className }: Props) {
  const [failed, setFailed] = useState(false);
  const initials = person.shortName.slice(0, 2).toUpperCase();

  if (person.avatar && !failed) {
    return (
      // Local static assets; native img keeps the chip layout simple.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={person.avatar}
        alt=""
        width={size === 'md' ? 28 : 24}
        height={size === 'md' ? 28 : 24}
        className={cn(
          'shrink-0 rounded-full object-cover ring-1 ring-border/60',
          SIZE[size],
          className,
        )}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-muted font-mono font-semibold text-muted-foreground ring-1 ring-border/60',
        SIZE[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
