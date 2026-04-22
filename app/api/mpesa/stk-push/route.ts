// Mock Safaricom Daraja STK Push endpoint
// Real integration: POST https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest
// Requires OAuth bearer token, registered Business Shortcode, and public callback URL.

export async function POST(req: Request) {
  const { phone, amount, csoName } = await req.json() as {
    phone: string;
    amount: number;
    csoName: string;
  };

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 90% success rate simulation
  const success = Math.random() > 0.1;

  if (success) {
    return Response.json({
      success: true,
      checkoutRequestId: `ws_CO_${Date.now()}`,
      message: `STK push sent to ${phone}. Enter your M-Pesa PIN to complete your KES ${amount} donation to ${csoName}.`,
    });
  }

  return Response.json(
    {
      success: false,
      errorCode: 'TIMEOUT',
      message: 'Request timed out. Please check your phone is on and try again.',
    },
    { status: 408 },
  );
}
