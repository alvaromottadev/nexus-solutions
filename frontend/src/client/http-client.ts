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

  postWithFormData(url: string, formData: FormData) {
    return fetch(defaultUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
  }

  get(url: string, headers: HeadersInit) {
    return fetch(defaultUrl + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }
}

const client = new HttpClient();
export default client;
