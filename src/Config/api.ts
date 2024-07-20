const baseUrl = "http://3.110.223.149:3000/code";

const BASE_API = window.location.href.startsWith("http://localhost:517")
  ? "http://localhost:3000/code"
  : baseUrl;

export { BASE_API };
