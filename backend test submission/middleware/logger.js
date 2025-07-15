import axios from "axios";

// Reusable logging function
export const Log = async (stack, level, pkg, message) => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message,
      }
    );
    console.log("✅ Log sent:", response.data);
  } catch (error) {
    console.error(
      "Error while sending log:",
      error.response?.data || error.message
    );
  }
};

