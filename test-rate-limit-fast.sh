#!/bin/bash

echo "=== Testing Rate Limiting (Fast Sequential Requests) ==="
echo "Sending 15 requests as fast as possible..."
echo ""

for i in {1..15}; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/razorpay/order \
    -H "Content-Type: application/json" \
    -d '{"category":"birthday","name":"Rate Test","email":"test@example.com","personalStory":"Testing rate limiting with multiple fast requests in sequence","musicalStyle":"Pop"}' 2>/dev/null)

  if [ "$HTTP_CODE" = "429" ]; then
    echo "Request $i: ❌ RATE LIMITED (429) ✓"
  elif [ "$HTTP_CODE" = "200" ]; then
    echo "Request $i: ✅ Allowed (200)"
  else
    echo "Request $i: ⚠️ Status: $HTTP_CODE"
  fi
done

echo ""
echo "Test complete! If requests 11-15 show 429, rate limiting is working."
