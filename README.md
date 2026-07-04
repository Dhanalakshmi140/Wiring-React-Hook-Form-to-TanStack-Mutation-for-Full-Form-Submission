# Wiring React Hook Form to a Create Mutation — Starter

A `client/` + `server/` monorepo. Connect a **React Hook Form** to a **TanStack Query** mutation:
validate on the client, submit through a mutation, reflect the pending state, refresh + reset on
success, and route server-side field errors back into the form with `setError`.

## Structure
```
.
├── package.json            # root scripts (setup, dev via concurrently)
├── server/                 # Express API on :3001 (in-memory threads)
│   └── index.js            # GET/POST /api/threads with server-side validation
└── client/                 # Vite + React app on :5173
    ├── .env.development.example
    └── src/
        ├── services/threadApi.js       # provided — getThreads + createThread
        ├── components/ThreadList.jsx    # provided — reads ["threads"]
        └── components/ThreadForm.jsx    # YOU complete the 4 TODOs
```

## Setup & run
```bash
npm run setup                                   # install root + server + client
cp client/.env.development.example client/.env.development
npm run dev                                      # Express :3001, Vite :5173
#   open http://localhost:5173
```

## What you complete
Only `client/src/components/ThreadForm.jsx`:
1. `onSubmit` → `mutation.mutate(data)` (TODO 1)
2. Button driven by `mutation.isPending` (TODO 2)
3. `onSuccess` → invalidate `["threads"]` + `reset()` (TODO 3)
4. `onError` → `setError` for inline server errors (TODO 4)

## How to test
- Submit an empty form → client `required` errors block it.
- Submit a valid one → `POST` fires, list updates, form clears.
- Submit the title **"Welcome to the forum"** → the server returns `400 Title already taken`,
  which must appear **inline** under the Title field.

