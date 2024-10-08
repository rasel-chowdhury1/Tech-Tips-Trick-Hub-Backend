import { Types } from 'mongoose'
import { transactionId } from '../../utils/utils'
import { initiatePayment } from '../payment/payment.utils'
import { User } from '../user/user.model'
import { TBooking, TBookingRequest } from './booking.interface'
import { Booking } from './booking.model'

const createBookingIntoDB = async (
  email: string,
  bookingData: TBookingRequest,
) => {
  //   console.log(bookingData)
  const userInfo = await User.findOne({ email })
  console.log({userInfo})
  if (!userInfo) {
    throw new Error('User not found')
  }

  const paymentData = {
    transactionId: transactionId,
    amount: bookingData.amount,
    customerName: userInfo.name,
    customerEmail: email,
    customerPhone: userInfo.phone,
    paidStatus: 'booked',
  }

  console.log({paymentData})

  const paymentRes = await initiatePayment(paymentData)
  console.log({paymentRes})

  const customerId = new Types.ObjectId(userInfo._id)

  const newBookingData: Partial<TBooking> = {
    user: customerId,
    tran_id: transactionId,
    status: 'pending',
  }

  await Booking.create(newBookingData)

  return paymentRes
}

export const bookingServices = {
  createBookingIntoDB,
}
