const Copyright = () => {
  const actualYear = new Date().getFullYear();
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <p className="text-sm">{`© ${actualYear} by Margritt Martinet.`}</p>
    </div>
  );
};
export default Copyright;
