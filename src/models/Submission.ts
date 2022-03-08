import { OrderCalculationResult } from "./OrderCalculationResult";

export interface Submission {
  email: string
  results: OrderCalculationResult[]
}