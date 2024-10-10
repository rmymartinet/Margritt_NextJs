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
      <div className="text-md md:text-xl">{label}</div>
      <div className="opacity-70">{value}</div>
    </div>
  );
};

export default InfosItem;
