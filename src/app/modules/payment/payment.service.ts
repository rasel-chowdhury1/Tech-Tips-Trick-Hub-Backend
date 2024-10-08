import config from '../../config'
import { Booking } from '../booking/booking.model'
import { User } from '../user/user.model'
import { verifyPayment } from './payment.utils'

const confirmationService = async (
  transactionId: string,
  status: string,
  paidStatus: string,
) => {
  const verifyResponse = await verifyPayment(transactionId)

  if (verifyResponse && verifyResponse?.pay_status === 'Successful') {
    const bookingInfo = await Booking.find({ tran_id: transactionId })
    const userId = bookingInfo[0]?.user
    await User.findByIdAndUpdate(userId, { status: 'premium' }, { new: true })

    await Booking.findOneAndUpdate(
      { tran_id: transactionId },
      {
        status: paidStatus,
      },
      { new: true },
    )
  }
 
  let template;

  const successTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            color: #4CAF50;
        }

        p {
            font-size: 16px;
            color: #555;
        }

        .home-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .home-link:hover {
            background-color: #45a049;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Payment Successful!</h1>
        <p>Your payment has been successfully processed. Thank you for your purchase! You will receive an email confirmation shortly with the details of your transaction.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <a href="http://localhost:3000" class="home-link">Return to Home Page</a>
    </div>
</body>

</html>

  `

  const cancleTemplate = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Canceled</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            color: #f44336;
        }

        p {
            font-size: 16px;
            color: #555;
        }

        .home-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #f44336;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .home-link:hover {
            background-color: #e53935;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Payment Canceled</h1>
        <p>Your payment process has been canceled. No charges have been made to your account.</p>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <a href="http://localhost:3000" class="home-link">Return to Home Page</a>
    </div>
</body>

</html>

  `

  if(status === "success"){
    template = successTemplate;
  }
  else{
    template = cancleTemplate
  }
  return template;
}

export const PaymentServices = {
  confirmationService,
}
