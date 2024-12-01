interface InfosItemProps {
  label: string;
  value: string | JSX.Element;
  className?: string;
}

const InfosItem = ({ label, value, className }: InfosItemProps) => {
  return (
    <div className={`grid-cols-customShopId grid ${className} `}>
      <div className="text-md md:text-xl">{label}</div>
      <div className="text-base text-slate-400 md:text-lg">{value}</div>
    </div>
  );
};

export default InfosItem;
