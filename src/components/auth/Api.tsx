export type RequestType = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
const API_BASE_URL: string = "https://tsapi.gigin.dev/api/";
export type authResponse = {
    username: string;
    url: string;
  };
  
export const customRequest = async (
  endpoint: string,
  method: RequestType = "GET",
  data: any = {}
) => {
  let url: string = "";
  let payload: string | null = null;
  if (method === "GET") {
    payload = data ? JSON.stringify(data) : null;
    const params: string = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = API_BASE_URL + endpoint + params;
  } else {
    payload = JSON.stringify(data);
    url = API_BASE_URL + endpoint;
  }
  // Token Auth
  const auth = "Basic " + window.btoa("anuranroy02:7PtjhbM3TwkX2Zu");
  //const token = localStorage.getItem("authToken");
  //const auth = token ? "Token " + localStorage.getItem("authToken") : "";

  console.log("Auth header = " + auth);
  console.log(`Payload is:`);
  console.log(payload);
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: auth,
    },
    body: method === "POST" ? payload : null,
  });
  //   const data = await response.json();
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const login = async (username: string, password: string) => {
  // console.log(username, password);
  return customRequest("auth-token/", "POST", { username, password });
  // return details;
};

export const me = async () => {
  const req = customRequest("users/me/", "GET", {});
  return req;
};

export const isLoggedIn = async () => {
  const response: authResponse = await me();

  return response.username.length > 0;
};

export const register = async (email:string,username: string,password1: string,password2:string) => {
    return customRequest("auth/registration/", "POST", { username,email,password1,password2 });
};