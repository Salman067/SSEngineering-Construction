const validateInputs = (inputs) => {
  const { firstNane, lastName, email,  password, title, content } =
    inputs;
  let error = "";
  // Validate name
  if (firstNane && !firstNane.trim()) {
    error = "firstNane is required";
    return error;
  } else if (firstNane && firstNane.trim().length > 30) {
    error = "firstName must not exceed 30 characters";
    return error;
  }
  // Validate name
  if (lastName && !lastName.trim()) {
    error = "lastName is required";
    return error;
  } else if (lastName && lastName.trim().length > 30) {
    error = "lastName must not exceed 30 characters";
    return error;
  }
  // Validate email
  if (email && !email.trim()) {
    error = "Email is required";
    return error;
  } else if (email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error = "Invalid email address";
      return error;
    }
  }

  // Validate password
  if (password && !password.trim()) {
    error = "Password is required";
    return error;
  } else if (
    password &&
    (password.trim().length < 4 || password.trim().length > 20)
  ) {
    error = "Password must be between 4-20 characters";
    return error;
  }

  // Validate title

  if (title && !title.trim()) {
    error = "Title is required";
    return error;
  } else if (title && title.trim().length > 200) {
    error = "Title can be at most 200 characters";
    return error;
  }

  // Validate content
  if (content && !content.trim()) {
    error = "Content is required";
    return error;
  } else if (content && content.trim().length > 20000) {
    error = "Content can be at most 20000 characters";
    return error;
  }

  return null;
};

export default validateInputs;
