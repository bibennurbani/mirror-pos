export function handleError(error: unknown): string {
  // Handle specific API error structure
  if (error instanceof Error && 'response' in error && typeof error.response === 'object') {
    const apiError = error as Error & { response: { data: { message: string } } };
    if (apiError.response && apiError.response.data && apiError.response.data.message) {
      return apiError.response.data.message;
    }
  }
  // Fallback to general error handling
  return error instanceof Error ? error.message : "An unknown error occurred";
}
