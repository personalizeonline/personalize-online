#!/bin/bash

echo "=== Testing Rate Limiting (Order API - 10 req/min limit) ==="
echo ""

for i in {1..12}; do
  echo -n "Request $i: "

  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/razorpay/order \
    -H "Content-Type: application/json" \
    -d '{"category":"birthday","name":"Rate Test","email":"test@example.com","personalStory":"Testing rate limiting with multiple requests in sequence","musicalStyle":"Pop"}')

  if [ "$HTTP_CODE" = "429" ]; then
    echo "❌ Rate Limited (429)"
  elif [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Allowed (200)"
  else
    echo "⚠️ Status: $HTTP_CODE"
  fi

  sleep 0.5
done

echo ""
echo "Rate limiting test complete!"
