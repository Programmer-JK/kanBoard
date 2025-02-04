export const getTagColorClass = (color: string) => {
  const colorMap: { [key: string]: string } = {
    red: "bg-red-300/30 text-red-700",
    orange: "bg-orange-300/30 text-orange-700",
    yellow: "bg-yellow-300/30 text-yellow-700",
    blue: "bg-blue-300/30 text-blue-700",
    green: "bg-green-300/30 text-green-700",
    purple: "bg-purple-300/30 text-purple-700",
    gray: "bg-gray-300/30 text-gray-700",
    pink: "bg-pink-300/30 text-pink-700",
  };
  return colorMap[color] || "bg-gray-300/30 text-gray-700";
};

export const generateSimpleId = () => {
  return Date.now().toString();
};
