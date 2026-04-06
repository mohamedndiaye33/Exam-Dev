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
    throw new Error(data.message || "Erreur lors de l'inscription");
  }

  return data;
};