export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return matches ? decodeURIComponent(matches[2]) : null;
  };
  
  export const setCookie = (
    name: string,
    value: string,
    options: { [key: string]: any } = {}
  ) => {
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }
    document.cookie = updatedCookie;
  };
  