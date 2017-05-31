export function deleteCookie(name, value) {
  const date = new Date(-1).toUTCString();
  document.cookie = `${name}=${value}; expires=${date}`;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function saveCookie(name, value) {
  const date = new Date(Date.now() + 360000).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${date}`;
}
