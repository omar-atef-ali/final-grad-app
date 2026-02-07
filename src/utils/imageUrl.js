export const BASE_URL = "https://deebai.runasp.net";

export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path}`;
};
