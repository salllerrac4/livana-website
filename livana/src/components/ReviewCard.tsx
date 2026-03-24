interface ReviewCardProps {
  name: string;
  title: string;
  message: string;
  rating: number;
}

const ReviewCard = ({ name, title, message, rating }: ReviewCardProps) => {
  return (
    <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-primary">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={index < rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.48 3.5a.75.75 0 011.04 0l2.34 2.29c.1.1.24.15.38.13l3.21-.47a.75.75 0 01.85.85l-.47 3.21a.5.5 0 00.15.43l2.3 2.34a.75.75 0 010 1.04l-2.3 2.34a.5.5 0 00-.15.43l.47 3.21a.75.75 0 01-.85.85l-3.21-.47a.5.5 0 00-.43.15l-2.34 2.3a.75.75 0 01-1.04 0l-2.34-2.3a.5.5 0 00-.43-.15l-3.21.47a.75.75 0 01-.85-.85l.47-3.21a.5.5 0 00-.15-.43l-2.3-2.34a.75.75 0 010-1.04l2.3-2.34a.5.5 0 00.15-.43l-.47-3.21a.75.75 0 01.85-.85l3.21.47a.5.5 0 00.43-.15l2.34-2.29z"
            />
          </svg>
        ))}
      </div>
      <h4 className="mt-4 text-lg font-semibold text-textMain">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-textMain/80">“{message}”</p>
      <p className="mt-4 text-sm font-semibold text-primary">{name}</p>
    </div>
  );
};

export default ReviewCard;
