// Arquivo centralizado de configurações
export const API_BASE_URL = 'http://localhost:5000';

export function renderErrorMessage(title, message) {
  return `<div class="error-message">
    <h1>${title}</h1>
    <p>${message}</p>
  </div>`;
}