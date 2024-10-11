interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={`h-64 w-64 animate-pulse rounded-md bg-gray-300 ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
