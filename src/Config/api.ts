const baseUrl = "https://manas.vidhyaskillschool.com/code";

const BASE_API = window.location.href.startsWith("http://localhost:517")
  ? "http://localhost:3000/code"
  : baseUrl;

export { BASE_API };
