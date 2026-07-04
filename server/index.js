const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data (Module 3 will swap this for a real database).
let threads = [
  { id: 1, title: "Welcome to the forum", body: "Say hello here." },
  { id: 2, title: "Posting rules", body: "Be kind and stay on topic." },
];
let nextId = 3;

// List all threads.
app.get("/api/threads", (req, res) => {
  res.json(threads);
});

// Create a thread — with server-side validation.
// Returns 400 + { errors: { field: message } } that the form renders inline.
app.post("/api/threads", (req, res) => {
  const { title, body } = req.body ?? {};
  const errors = {};

  const trimmedTitle = (title ?? "").trim();
  const trimmedBody = (body ?? "").trim();

  if (!trimmedTitle) {
    errors.title = "Title is required";
  } else if (trimmedTitle.length < 5) {
    errors.title = "Title must be at least 5 characters";
  } else if (threads.some((t) => t.title.toLowerCase() === trimmedTitle.toLowerCase())) {
    // Business rule only the server can enforce — great for testing setError.
    errors.title = "Title already taken";
  }

  if (!trimmedBody) {
    errors.body = "Body is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const thread = { id: nextId++, title: trimmedTitle, body: trimmedBody };
  threads.push(thread);
  res.status(201).json(thread);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
