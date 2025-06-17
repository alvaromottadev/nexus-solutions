interface CustomTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function CustomText({ children, className }: CustomTextProps) {
  return (
    <>
      <label className={`text-black font-poppins ${className}`}>
        {children}
      </label>
    </>
  );
}
