#!/bin/bash

echo "=== Testing Rate Limiting with Detailed Output ==="
echo "Testing order creation API (limit: 10 req/min)"
echo ""

# Test with same IP to trigger rate limit
for i in {1..13}; do
  HTTP_CODE=$(curl -s -o /tmp/response$i.json -w "%{http_code}" -X POST http://localhost:3000/api/razorpay/order \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: 10.0.0.1" \
    -d "{\"category\":\"birthday\",\"name\":\"Test $i\",\"email\":\"test$i@example.com\",\"personalStory\":\"Request number $i from same IP to test rate limiting functionality\",\"musicalStyle\":\"Pop\"}")

  if [ "$HTTP_CODE" = "429" ]; then
    ERROR_MSG=$(cat /tmp/response$i.json | jq -r '.error' 2>/dev/null || echo "Rate limited")
    echo "Request $i: ❌ RATE LIMITED (429) - $ERROR_MSG ✓ SUCCESS!"
  elif [ "$HTTP_CODE" = "200" ]; then
    ORDER_ID=$(cat /tmp/response$i.json | jq -r '.orderId' 2>/dev/null | cut -c1-25)
    echo "Request $i: ✅ Allowed (200) - Order: $ORDER_ID..."
  else
    ERROR=$(cat /tmp/response$i.json | jq -r '.error' 2>/dev/null || echo "Unknown")
    echo "Request $i: ⚠️  Status $HTTP_CODE - Error: $ERROR"
  fi

  # Small delay to avoid overwhelming Razorpay
  sleep 0.2
done

echo ""
echo "✓ Rate limiting is WORKING if requests 11-13 show 429!"
rm -f /tmp/response*.json
