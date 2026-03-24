import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-primary/15 py-4">
      <button
        className="flex w-full items-center justify-between text-left text-lg font-medium text-textMain"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="text-primary">{open ? '-' : '+'}</span>
      </button>
      {open && <p className="mt-3 text-sm text-textMain/80">{answer}</p>}
    </div>
  );
};

export default FAQItem;
