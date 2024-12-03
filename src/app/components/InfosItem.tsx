interface InfosItemProps {
  label: string;
  value: string | JSX.Element;
  className?: string;
  textColor: string;
}

const InfosItem = ({ label, value, className, textColor }: InfosItemProps) => {
  return (
    <div className={`grid grid-cols-2 gap-2 ${className} `}>
      <div className="text-lg md:text-xl">{label}</div>
      <div className={`text-base ${textColor} md:text-lg`}>{value}</div>
    </div>
  );
};

export default InfosItem;
