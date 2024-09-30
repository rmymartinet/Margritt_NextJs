interface InfosItemProps {
  label: string;
  value: string | JSX.Element;
  className?: string;
}

const InfosItem = ({ label, value }: InfosItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-md md:text-xl">{label}</span>
      <p className="opacity-70">{value}</p>
    </div>
  );
};

export default InfosItem;
