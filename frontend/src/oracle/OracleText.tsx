interface OracleTextProps {
  header: string;
  content: string;
}

export default function OracleText({ header, content }: OracleTextProps) {
  return (
    <div className="flex flex-col text-white font-poppins">
      {header && (
        <h3 className="text-lg font-semibold text-purple-200 mb-2">
          {header}
        </h3>
      )}
      <p className="text-sm leading-relaxed text-white">
        {content}
      </p>
    </div>
  );
}
