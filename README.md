# payment-webhook
A demonstration of how webhook listener for payments work. 

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kenwaysharma/payment-webhook.git
cd payment-webhook
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm run start
```

## Routes
There are two main routes present in the application. 

### 1. /webhook/payment `POST`
- This route can be protected with `validate` middleware present in the application. Make sure to add `x-payment-signature` in the header of the API request with the actual signature of the incoming payment details.
- This route is the listener for all the incoming payments information
- Use the sample payload given in the *Test* section to try this out.

### 2. /payments/<payment-id>/events `GET`
- Use this to receive all the events for a particular payment ID
- Eg: /payments/pay_001/events

## Test
To test the application, use the mock_payload folder containing mock data for your use.

### 1. Sample payload for payment authorised
```
 {
    "event": "payment.authorized",
    "payload": {
      "payment": {
        "entity": {
          "id": "pay_002",
          "status": "authorized",
          "amount": 4000,
          "currency": "INR"
        }
      }
    },
    "created_at": 1751886265,
    "id": "evt_auth_002"
  }
```

### 2. Sample payload for payment captured
```
 {
    "event": "payment.captured",
    "payload": {
      "payment": {
        "entity": {
          "id": "pay_004",
          "status": "captured",
          "amount": 4000,
          "currency": "INR"
        }
      }
    },
    "created_at": 1751886985,
    "id": "evt_cap_004"
  }
```

### 3. Sample payload for payment failed
```
 {
    "event": "payment.failed",
    "payload": {
      "payment": {
        "entity": {
          "id": "pay_001",
          "status": "failed",
          "amount": 1000,
          "currency": "INR"
        }
      }
    },
    "created_at": 1751886085,
    "id": "evt_fail_001"
  }
```

## Additinal Details
- Use the Postman Collection for this API
[payments-webhook.postman_collection.json](https://github.com/user-attachments/files/21672711/payments-webhook.postman_collection.json)

  
