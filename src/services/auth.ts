// REGISTER
export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.message;
};

// LOGIN
export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  // 🔐 stocker token
  localStorage.setItem("token", data.token);

  return data.message;
};