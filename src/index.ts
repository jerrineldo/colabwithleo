import Axios from 'axios'
import { OrderLine } from './models/OrderLine';
import { OrderCalculationResult } from './models/OrderCalculationResult';
import { Submission } from './models/Submission';
import { SubmissionResponse } from './models/SubmissionResponse';

const YourEmail = 'youremail@gmail.com'

async function getOrderLines(): Promise<OrderLine[]> {
  const response = await Axios.get<OrderLine[]>("https://archoninterviewssoftwaredeveloper.azurewebsites.net/api/order-lines/problem1/sample")
  return response.data
}

function calculate(orderLines: OrderLine[]): OrderCalculationResult[] {
  
  try{
  var arr : OrderCalculationResult[] = []
  var length = 0

  for (const order of orderLines) {
    arr[length] = { 
      orderId : order.orderId,
      total : order.quantity * order.unitPrice
    } 
    length++
  }

  return arr
}catch (err) {
  console.error("Something went wrong")
  console.error(err)
}
  
}

async function submitResults(results: OrderCalculationResult[]) {
  const submission: Submission = {
    email: YourEmail,
    results
  }

  const response = await Axios.post<SubmissionResponse>("https://archoninterviewssoftwaredeveloper.azurewebsites.net/api/results/problem1/sample", submission)
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