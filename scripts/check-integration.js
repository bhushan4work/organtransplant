const http = require('http');

async function runCheck() {
  console.log("Checking API Integration...");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    const res = await fetch(`${apiUrl}/api/v1/health`);
    if (res.ok) {
      console.log("✅ API is reachable and healthy.");
    } else {
      console.log("⚠️ API returned status: " + res.status);
    }
  } catch (err) {
    console.error("❌ Failed to reach API:", err.message);
    process.exit(1);
  }
}

runCheck();
