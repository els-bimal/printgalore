import { useQuery } from "@apollo/client";
import { TRY_PAYMENT } from "~/server/queries";


function PaymentTransactionResponse(paymentDetail) {
    console.log(paymentDetail)

    const { loading, error, data } = useQuery(TRY_PAYMENT, { variables: paymentDetail })

    if (loading) return <p>Loading</p>

    if (data) {
        return (
            <div className="">

            </div>
        )
    }
}

export default PaymentTransactionResponse