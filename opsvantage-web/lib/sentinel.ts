import { fetcher } from './api'

export async function getTokenBalance(address: string, tokenAddress: string) {
  // Placeholder: use Alchemy or Ethers to query token balance
  const url = `/api/balance?address=${address}&token=${tokenAddress}`
  return fetcher(url)
}

export async function getRecentActivity(address: string) {
  const url = `/api/activity?address=${address}`
  return fetcher(url)
}

export async function getSecurityAlerts(address: string) {
  const url = `/api/alerts?address=${address}`
  return fetcher(url)
}
