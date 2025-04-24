# ConcurrencyManagerNoNameBVTest

This project demonstrates how to manage and control asynchronous task execution with a configurable concurrency limit using vanilla JavaScript (Node.js).

- Dynamically generated list of mock tasks
- Concurrency control to limit parallel executions
- Real-time console logs showing task status
- Runtime adjustment of concurrency level
- Lightweight and dependency-free

## 📦 How It Works

Each task simulates an asynchronous operation (e.g. network call or I/O) using `setTimeout`. The concurrency logic ensures that no more than `concurrencyMax` tasks run at the same time.

Concurrency is dynamically reduced after 1 second to simulate real-world constraints.

## 🧪 Run It

1. Make sure Node.js is installed.
2. Run: npm start || node index.js
