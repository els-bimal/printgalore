const axios = require("axios")
const { AccessTokenURL } = require("../config/devEnv");
const PaymentDetail = require('../models/paymentDetail')

module.exports = {
    Query: {
        tryPayment: async (parent, args, context, info) => {
            // console.log("Attemping to Try Payment...")
            // console.log(args)

            const transactionDetail =
            {
                amount: args.amount,
                credit_card: {
                    number: args.credit_card.number, // as String
                    expiration_month: args.credit_card.expiration_month, // must be two digit month as String
                    expiration_year: args.credit_card.expiration_year // 4 digit year as String
                },
                // integrator_id: "xxxxxxxxxx",
                csc: args.csc,
                billing_address: {
                    name: args.billing_address.name,
                    street_address: args.billing_address.street_address,
                    city: args.billing_address.city,
                    state: args.billing_address.state,
                    zip: args.billing_address.zip,
                }
            }


            // TEST
            // const transactionDetail =
            // {
            //     "amount": 1.00,
            //     "credit_card": {
            //         "number": "4012000098765439",
            //         "expiration_month": "12",
            //         "expiration_year": "2024"
            //     },
            //     IntegratorID: "9Y21l1zt955d",
            //     "csc": "999",
            //     "billing_address": {
            //         "name": "Steve Smith",
            //         "street_address": "8320 E. West St.",
            //         "city": "Spokane",
            //         "state": "WA",
            //         "zip": "85284"
            //     }
            // }

            let AuthTokenResponse = await axios.post(AccessTokenURL)

            // AuthTokenResponse Test
            // let AuthTokenResponse = {}
            // AuthTokenResponse.status = 400

            if (AuthTokenResponse.status === 200) {
                // console.log("GOT ACCESS TOKEN:", AuthTokenResponse.data.access_token.substring(84))

                const hostURL = "https://api.paytrace.com"
                const transactionsSaleKeyedURL = "/v1/transactions/sale/keyed"
                const URL = hostURL + transactionsSaleKeyedURL

                const headers = {
                    headers: {
                        "Authorization": "Bearer " + AuthTokenResponse.data.access_token,
                        // "Content-Type": "application/json",
                        "Cache-Control": "no-cache",
                        // "User-Agent": "yoMom/0.69"
                    }
                }


                // console.log(`POSTing to: ` + URL, headers)
                // console.log(`Attemping to POST to Keyed Sale Txn...`)
                let KeyedSaleTxnResponse = await axios.post(URL, transactionDetail, headers).catch(err => {
                    console.log("ERROR 001: KeyedSaleTxnResponse:", err.response.data.status_message)
                    // console.log(`Total: ${Object.keys(err.response.data.errors).length}`)

                    return err.response
                })


                // TEST
                // KeyedSaleTxnResponse Test
                // let KeyedSaleTxnResponse = {}
                // KeyedSaleTxnResponse.status = 400




                // console.log(`KeyedSaleTxnResponse.status: ${KeyedSaleTxnResponse.status}`)

                // GOOD TRANSACTION
                if (KeyedSaleTxnResponse.status === 200) {
                    // console.log(`PROCESSING GOOD TRANSACTION  ${KeyedSaleTxnResponse.data.status_message}`)
                    // console.log(`Printing KeyedSaleTxnResponse:`)
                    // console.log(KeyedSaleTxnResponse.data)

                    const paymentResponse = {
                        msg: "SUCCESS: KeyedSaleTxnResponse",
                        status: KeyedSaleTxnResponse.status,
                        KeyedSaleTxnResponseData: KeyedSaleTxnResponse.data
                    }

                    const paymentDetail = new PaymentDetail(
                        {
                            orderId: "321",
                            amount: transactionDetail.amount,
                            success: KeyedSaleTxnResponse.data.success,
                            status_message: KeyedSaleTxnResponse.data.status_message,
                            masked_card_number: KeyedSaleTxnResponse.data.masked_card_number,
                            // errors: KeyedSaleTxnResponse.data.errArr,
                        }
                    )

                    // console.log(paymentDetail)

                    // console.log(`Attempting to POST Payment Detail to DB:  OrderId:${paymentDetail.orderId}`)
                    let PaymentDetailSaveResponse = await paymentDetail.save().catch(err => {
                        console.log("ERROR 003: PaymentDetailSaveResponse:", err)
                        // console.log(`Total: ${Object.keys(err.response.data.errors).length}`)

                        return err.response
                    })

                    if (PaymentDetailSaveResponse) {
                        // console.log(`PaymentDetailSaveResponse:`, PaymentDetailSaveResponse)


                        // console.log("Printing Payment Detail Save Response: doc _id: " + PaymentDetailSaveResponse._id)
                        // console.log(PaymentDetailSaveResponse._id)

                        // TEST TO BRING BACK PAYMENT DETAIL DOC
                        let paymentDoc = await PaymentDetail.findOne({ _id: PaymentDetailSaveResponse._id }).catch(err => {
                            console.log("ERROR 004: PaymentDetail.find() ")
                            // console.log(err)
                        })

                        paymentResponse.paymentDetailId = PaymentDetailSaveResponse._id

                        // console.log("Printing Payment Doc: ")
                        // console.log(`138: `, paymentDoc)

                        return paymentResponse
                    }



                }


                // FAILED TRANSACTION
                else {
                    // console.log("Keyed Sale Response Payment: ")
                    // console.log(KeyedSaleTxnResponse.data)
                    let allErrors = []

                    if (KeyedSaleTxnResponse.data && KeyedSaleTxnResponse.data.errors && Object.values(KeyedSaleTxnResponse.data.errors).length > 0) {

                        const getErrArr = () => {
                            // console.log("running getErrArr")

                            return new Promise(resolve => {

                                for (let i = 0; i < Object.values(KeyedSaleTxnResponse.data.errors).length; i++) {
                                    allErrors.push(Object.values(KeyedSaleTxnResponse.data.errors)[i][0])

                                }

                                // console.log("Finished getErrArr", allErrors)
                                resolve(allErrors)

                            })
                        }


                        const allErrorArray = await getErrArr()
                        KeyedSaleTxnResponse.data.errArr = allErrorArray
                    } else {
                        allErrors.push(KeyedSaleTxnResponse.data.status_message)
                        KeyedSaleTxnResponse.data.errArr = allErrors
                    }

                    const paymentResponse = {
                        msg: `ERROR 002: KeyedSaleTxnResponse ${KeyedSaleTxnResponse.data.status_message} `,
                        status: KeyedSaleTxnResponse.status,
                        errData: KeyedSaleTxnResponse.data,
                    }





                    return paymentResponse

                }

            } else {

                const paymentResponse = {
                    msg: "ERROR",
                    status: AuthTokenResponse.status
                }

                return paymentResponse
            }

        },


    },
};
