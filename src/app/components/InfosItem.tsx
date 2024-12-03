interface InfosItemProps {
  label: string;
  value: string | JSX.Element;
  className?: string;
}

const InfosItem = ({ label, value, className }: InfosItemProps) => {
  return (
    <div className={`grid grid-cols-2 gap-10 ${className} `}>
      <div className="text-md md:text-xl">{label}</div>
      <div className="text-base font-medium text-white md:text-lg">{value}</div>
    </div>
  );
};

export default InfosItem;
