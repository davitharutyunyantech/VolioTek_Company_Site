export function getAdminCsrfToken() {
  if (typeof document === 'undefined') {
    return '';
  }

  return (
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('voliotek_admin_csrf='))
      ?.split('=')
      .slice(1)
      .join('=') ?? ''
  );
}

export function adminJsonHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-csrf-token': getAdminCsrfToken(),
  };
}

export function adminMutationHeaders() {
  return {
    'x-csrf-token': getAdminCsrfToken(),
  };
}
