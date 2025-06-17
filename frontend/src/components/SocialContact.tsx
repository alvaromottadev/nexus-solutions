import CustomText from "./CustomText";

interface ContactSectionProps {
  children?: React.ReactNode;
  socialName: string;
  socialHandle: string;
}

export default function SocialContact({
  children,
  socialName,
  socialHandle,
}: ContactSectionProps) {
  return (
    <>
      <div className="flex gap-x-3 items-center">
        {children}
        <CustomText>{socialName}:</CustomText>
        <CustomText className="text-[var(--primary-color)]">
          {socialHandle}
        </CustomText>
      </div>
    </>
  );
}
