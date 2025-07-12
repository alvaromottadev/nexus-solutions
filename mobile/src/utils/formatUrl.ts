const IP = process.env.IP;

export default function formatUrl(url: string) {
  return url.replace(`localhost`, IP || 'localhost');
}
