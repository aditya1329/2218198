/**
 * Reusable logging function to send logs to remote test server.
 *
 * @param {string} stack   - "backend" or "frontend"
 * @param {string} level   - One of: "debug", "info", "warn", "error", "fatal"
 * @param {string} pkg     - Depends on stack. Example: "handler", "db", "api", etc.
 * @param {string} message - Descriptive error/info message
 */
export async function log(stack, level, pkg, message) {
  const url = "http://20.244.56.144/evaluation-service/logs";

  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: message,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to send log. Status:", response.status);
    } else {
      const result = await response.json();
      console.log("Log created:", result);
    }
  } catch (err) {
    console.error("Logging error:", err);
  }
}
