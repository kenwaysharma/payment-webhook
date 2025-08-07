import crypto from 'crypto';

const validate = (req, res, next) => {
/*     console.log("process.env.API_SECRET:", process.env.API_SECRET);
 */    
    console.log('Validating request:', req.body);
  const hmac = crypto.createHmac('sha256', process.env.API_SECRET);

  hmac.update(JSON.stringify(req.body));
  const expectedSignature = hmac.digest('hex');
  console.log('Expected signature:', expectedSignature);
  const receivedSignature = req.headers['x-payment-signature'];

  if (expectedSignature !== receivedSignature) {
    return res.status(403).json({ error: 'Invalid signature' });
  }
  next();
};

export default validate;