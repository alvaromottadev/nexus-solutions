export default function dateFormatter(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
