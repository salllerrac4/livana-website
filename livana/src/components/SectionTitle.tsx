interface SectionTitleProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  headingClassName?: string;
  as?: 'h1' | 'h2';
}

const SectionTitle = ({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  headingClassName = '',
  as = 'h2',
}: SectionTitleProps) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const HeadingTag = as;

  return (
    <div className={`space-y-2 ${alignment} max-w-3xl`}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">{eyebrow}</p>}
      <HeadingTag className={`text-3xl font-semibold text-textMain sm:text-4xl leading-tight ${headingClassName}`}>{heading}</HeadingTag>
      {subheading && <p className="text-base text-textMain/80 sm:text-lg">{subheading}</p>}
    </div>
  );
};

export default SectionTitle;
