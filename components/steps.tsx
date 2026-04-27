import type { ReactNode } from 'react';

const stepsStyles = `
  .fd-steps {
    counter-reset: fd-step;
    border-left: 2px solid hsl(var(--border));
    margin-left: 1rem;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .fd-step {
    counter-increment: fd-step;
    position: relative;
  }

  .fd-step::before {
    content: counter(fd-step);
    position: absolute;
    left: calc(-2rem - 1rem - 1px);
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1;
  }
`;

export function Steps({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{stepsStyles}</style>
      <div className="fd-steps">{children}</div>
    </>
  );
}

export function Step({ children }: { children: ReactNode }) {
  return <div className="fd-step">{children}</div>;
}