// components/feedback/client.tsx
'use client';

import { cn } from '../../lib/cn';
import { buttonVariants } from '../ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import {
  type SyntheticEvent,
  useEffect,
  useEffectEvent,
  useState,
  useTransition,
} from 'react';
import { Collapsible, CollapsibleContent } from '../ui/collapsible';
import { cva } from 'class-variance-authority';
import { usePathname } from 'fumadocs-core/framework';

const rateButtonVariants = cva(
  'inline-flex items-center gap-2 px-3 py-2 rounded-full font-medium border text-sm [&_svg]:size-4 disabled:cursor-not-allowed',
  {
    variants: {
      active: {
        true: 'bg-fd-accent text-fd-accent-foreground [&_svg]:fill-current',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

interface SubmissionState {
  opinion: 'good' | 'bad';
  message: string;
}

function useSubmissionStorage(pageUrl: string) {
  const storageKey = `docs-feedback-${pageUrl}`;
  const [value, setValue] = useState<SubmissionState | null>(null);

  const validateCallback = useEffectEvent((v: unknown): SubmissionState | null => {
    if (typeof v !== 'object' || v === null) return null;
    const obj = v as Record<string, unknown>;
    if (obj.opinion !== 'good' && obj.opinion !== 'bad') return null;
    return { opinion: obj.opinion, message: String(obj.message ?? '') };
  });

  useEffect(() => {
    const item = localStorage.getItem(storageKey);
    if (item === null) return;
    const validated = validateCallback(JSON.parse(item));
    if (validated !== null) setValue(validated);
  }, [storageKey]);

  return {
    previous: value,
    setPrevious(result: SubmissionState | null) {
      if (result) localStorage.setItem(storageKey, JSON.stringify(result));
      else localStorage.removeItem(storageKey);
      setValue(result);
    },
  };
}

interface FeedbackProps {
  orgId?: string;
}

export function Feedback({ orgId }: FeedbackProps) {
  const url = usePathname();
  const { previous, setPrevious } = useSubmissionStorage(url);
  const [opinion, setOpinion] = useState<'good' | 'bad' | null>(null);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  function submit(e?: SyntheticEvent) {
    if (opinion == null) return;
    e?.preventDefault();

    startTransition(async () => {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: url,
          org_id: orgId ?? null,
          opinion,
          message,
        }),
      });

      setPrevious({ opinion, message });
      setMessage('');
      setOpinion(null);
    });
  }

  const activeOpinion = previous?.opinion ?? opinion;

  return (
    <Collapsible
      open={opinion !== null || previous !== null}
      onOpenChange={(v) => {
        if (!v) setOpinion(null);
      }}
      className="border-y py-3"
    >
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm font-medium pe-2">How is this page?</p>
        <button
          disabled={previous !== null}
          className={cn(rateButtonVariants({ active: activeOpinion === 'good' }))}
          onClick={() => setOpinion('good')}
        >
          <ThumbsUp />
          Good
        </button>
        <button
          disabled={previous !== null}
          className={cn(rateButtonVariants({ active: activeOpinion === 'bad' }))}
          onClick={() => setOpinion('bad')}
        >
          <ThumbsDown />
          Bad
        </button>
      </div>

      <CollapsibleContent className="mt-3">
        {previous ? (
          <div className="px-3 py-6 flex flex-col items-center gap-3 bg-fd-card text-fd-muted-foreground text-sm text-center rounded-xl">
            <p>Thank you for your feedback!</p>
            <button
              className={cn(buttonVariants({ color: 'secondary' }), 'text-xs')}
              onClick={() => {
                setOpinion(previous.opinion);
                setPrevious(null);
              }}
            >
              Submit Again
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={submit}>
            <textarea
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded-lg bg-fd-secondary text-fd-secondary-foreground p-3 resize-none focus-visible:outline-none placeholder:text-fd-muted-foreground"
              placeholder="Leave your feedback... (optional)"
              rows={3}
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === 'Enter') submit(e);
              }}
            />
            <button
              type="submit"
              className={cn(buttonVariants({ color: 'outline' }), 'w-fit px-3')}
              disabled={isPending}
            >
              {isPending ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}