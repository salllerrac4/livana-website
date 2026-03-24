interface SectionTitleProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  headingClassName?: string;
}

const SectionTitle = ({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  headingClassName = '',
}: SectionTitleProps) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`space-y-2 ${alignment} max-w-3xl`}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">{eyebrow}</p>}
      <h2 className={`text-3xl font-semibold text-textMain sm:text-4xl leading-tight ${headingClassName}`}>{heading}</h2>
      {subheading && <p className="text-base text-textMain/80 sm:text-lg">{subheading}</p>}
    </div>
  );
};

export default SectionTitle;
