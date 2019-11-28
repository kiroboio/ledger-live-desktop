// @flow

// Kirobo library connector
// TODO: add description

export type SendTrxProps = {
  destination: string,
  amount: [],
  transaction: string,
  passcode: string,
}

export type SendTrxReport = {
  status: boolean,
  message?: string,
}

export type CreateTrxProps = {
  // TODO: add content
}

export type TransactionToDestination = {}

export type KiTrx = {
  status: boolean,
  message: string,
  payload: TransactionToDestination,
}

/**
 * Class holding the functions to connect to Kirobo library and API
 */
class Kirobo {
  /**
   * Function to process and send transaction to Kirobo API
   * TODO: verify details below and add example above
   * @param {Object} data - Data, required to create object
   * @param {string} data.destination - Destination account
   * @param {[]} data.amount - Amount in BigNumber.js format
   * @param {string} data.transaction - Signed transaction
   * @param {string} data.passcode - Passcode
   * @returns {Object} - Report for sending
   */
  sendTransaction = (data: SendTrxProps): SendTrxReport => {
    console.log('KI >> send this ', data)
    // TODO: Verify data
    // Encrypt data
    // Send the data
    return { status: true }
  }

  /**
   * Function to create transaction object to transfer money to the destination
   * TODO: add details below and example above
   * @param {Object} data - Date required to create transaction
   * @returns {Object} - Transaction, ready to be signed
   */
  createTransaction = (data: CreateTrxProps): KiTrx => {
    console.log('KI >> create with ', data)
    // TODO: Verify data
    // Create transaction object
    return { status: true, payload: {} }
  }
}

export default new Kirobo()
