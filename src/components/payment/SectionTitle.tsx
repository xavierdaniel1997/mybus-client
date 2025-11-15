interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return (
    <p className="p-4 font-semibold text-gray-900 text-sm">{title}</p>
  );
}
