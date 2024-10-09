interface InfosItemProps {
  label: string;
  value: string | JSX.Element;
  className?: string;
}

const InfosItem = ({ label, value, className }: InfosItemProps) => {
  return (
    <div
      className={`flex w-full flex-row items-center justify-between gap-4 ${className}`}
    >
      <span className="text-md md:text-xl">{label}</span>
      <p className="opacity-70">{value}</p>
    </div>
  );
};

export default InfosItem;
