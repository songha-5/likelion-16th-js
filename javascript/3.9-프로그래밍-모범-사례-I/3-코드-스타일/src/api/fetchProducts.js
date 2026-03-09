const API_END_POINT = import.meta.env.VITE_API_BASE_URL

const fetchManager = {
  controller: null,
}

async function fetchProducts(page = 1, limit = 20) {
  try {
    if (fetchManager.controller) fetchManager.controller.abort()

    const controller = new AbortController()
    const { signal } = controller

    fetchManager.controller = controller

    const response = await fetch(
      `${API_END_POINT}/products?page=${page}&limit=${limit}`,
      { signal },
    )

    if (!response.ok) {
      const responseText = await response.text()
      throw new Error(responseText)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error.name === 'AbortError') return null
    console.error(error.message)
    throw error
  } finally {
    fetchManager.controller = null
  }
}

export default fetchProducts
