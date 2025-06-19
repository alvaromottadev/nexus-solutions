const defaultUrl = import.meta.env.VITE_API_URL;

class HttpClient {
  post(url: string, headers: HeadersInit, body: BodyInit) {
    return fetch(defaultUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body,
    });
  }
}

const client = new HttpClient();
export default client;
