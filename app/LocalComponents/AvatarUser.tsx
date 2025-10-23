type AvatarProps = {
  name: string;
  color?: string; // optional: fallback background color
};

export default function Avatar({ name, color = "bg-blue-500" }: AvatarProps) {
  const firstChar = name?.charAt(0).toUpperCase() || "?";
  const firstCharV = name?.charAt(name?.length - 1).toUpperCase() || "?";

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-full text-white  text-xs ${color}`}
    >
      {firstChar}
    </div>
  );
}
