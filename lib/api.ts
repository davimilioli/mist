type Options = RequestInit & {
  params?: Record<string, string | number | boolean>
}

export async function getResource<T>(url: string, options: Options = {}): Promise<T> {
  const { params, ...customConfig } = options;
  const urlObj = new URL(url);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.set(key, String(value));
      }
    })
  }

  const response = await fetch(urlObj.toString(), {
    ...customConfig,
    headers: {
      ...customConfig.headers
    }
  })

  if (!response.ok) throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);

  return response.json() as Promise<T>;
}