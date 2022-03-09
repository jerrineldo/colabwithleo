import Axios from 'axios'
import { OrderLine } from './models/OrderLine';
import { OrderCalculationResult } from './models/OrderCalculationResult';
import { Submission } from './models/Submission';
import { SubmissionResponse } from './models/SubmissionResponse';

const YourEmail = 'jerin.jollybhavan@gmail.com'

async function getOrderLines(): Promise<OrderLine[]> {
  const response = await Axios.get<OrderLine[]>("https://archoninterviewssoftwaredeveloper.azurewebsites.net/api/order-lines/problem2/sample")
  return response.data
}

function calculate (orderLines: OrderLine[]): OrderCalculationResult[] {
  try {
    var arr: OrderCalculationResult[] = []
    var length = 0

    //console.log('orderLines :>> ', orderLines)

    for (const order of orderLines) {
      arr[length] = {
        orderId: order.orderId,
        total: order.quantity * order.unitPrice,
        buy2Get1FreeTotal : (order.quantity - Math.floor(order.quantity/3)) * order.unitPrice
      }
      length++
    }

    console.log('arr>>', arr)

    var holder = {}
    arr.forEach(function (d) {
      if (holder.hasOwnProperty(d.orderId)) {
        holder[d.orderId][0] = holder[d.orderId][0] + d.total
        holder[d.orderId][1] = holder[d.orderId][1] + d.buy2Get1FreeTotal
      } else {
        holder[d.orderId] = []
        holder[d.orderId].push(d.total)
        holder[d.orderId].push(d.buy2Get1FreeTotal)
      }
    })
    //console.log('holder>>', holder)

    var obj2 = []

    for (var prop in holder) {
      obj2.push({ orderId: Number(prop), total: holder[prop][0] , buy2Get1FreeTotal: holder[prop][1]  })
    }
    console.log('arr', obj2)
    return obj2
  } catch (err) {
    console.error('Something is wrong', { err })
    console.error(err)
  }
}

async function submitResults(results: OrderCalculationResult[]) {
  const submission: Submission = {
    email: YourEmail,
    results
  }

  const response = await Axios.post<SubmissionResponse>("https://archoninterviewssoftwaredeveloper.azurewebsites.net/api/results/problem2/sample", submission)
  console.log(response.data.allBuyTwoGetOneFreeTotalsAreCorrect ? "Buy 2 get 1 free totals are correct" : "Buy 2 get 1 free totals are not correct")
  console.log(response.data.allOrderTotalsAreCorrect ? "Totals are correct" : "Totals are not correct")
  for (const hint of response.data.hints) {
    console.log(hint)
  }
}

async function problem1Sample() {
  const orderLines = await getOrderLines();
  console.log(orderLines)
  const results = calculate(orderLines)
  await submitResults(results)
}

async function Main() {
  try{
  await problem1Sample()
  }
    catch (err) {
      console.error("Something went wrong")
      console.error(err)
    
  }
}

Main()