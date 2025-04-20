import Link from 'next/link';

const Breadcrumb = ({ items }: { items: { label: string; href?: string }[] }) => {
  return (
    <div className="mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link href={item.href} className="text-blue-500 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;