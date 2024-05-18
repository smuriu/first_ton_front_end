import { useEffect, useState } from 'react'
import { useTonClient } from './useTonClient'
import { Address, OpenedContract, toNano } from '@ton/core'
import { useAsyncInitialize } from './useAsyncInitialize'
import { MainContract } from '../contracts/MainContract'
import { useTonConnect } from './useTonConnect'

export function useMainContract() {
  const client = useTonClient()
  const [contractData, setContractData] = useState<null | {
    counter_value: number
    recent_sender: Address
    owner_address: Address
  }>(null)
  const [balance, setBalance] = useState<number>(0)
  const { sender } = useTonConnect()

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return
    const contract = new MainContract(
      Address.parse('kQAM5bkjQ_x9hm3cyO5518Vq8m4tF6vmsUg2Zirq73Chih84')
    )

    return client.open(contract) as OpenedContract<MainContract>
  }, [client])

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return

      setContractData(null)

      const val = await mainContract.getData()
      const { balance } = await mainContract.getBalance()

      setContractData({
        counter_value: val.number,
        recent_sender: val.recent_sender,
        owner_address: val.recent_sender
      })
      setBalance(balance)

      await sleep(10000)
      getValue()
    }

    getValue()
  }, [mainContract])

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
    sendIncrement: () => {
      return mainContract?.sendIncrement(sender, toNano(0.05), 3)
    },
    sendDeposit: () => {
      return mainContract?.sendDeposit(sender, toNano('1'))
    },
    sendWithdrawalRequest: () => {
      return mainContract?.sendWithdrawalRequest(sender, toNano('0.05'), toNano('1'))
    }
  }
}