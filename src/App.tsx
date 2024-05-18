import { TonConnectButton } from '@tonconnect/ui-react'
import './App.css'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect'

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest
  } = useMainContract()
  const { connected } = useTonConnect()

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{contract_balance}</div>
        </div>

        <div className='Card'>
          <b>Recent Sender</b>
          <div>{recent_sender?.toString() ?? 'Loading...'}</div>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        {connected && (
          <>
            <div className='Card'>
              <button onClick={() => sendIncrement()}>Increase counter by 3</button>
            </div>
            <br />
            <div className='Card'>
              <button onClick={() => sendDeposit()}>Deposit 1 TON</button>
            </div>
            <br />
            <div className='Card'>
              <button onClick={() => sendWithdrawalRequest()}>Withdraw 1 TON</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
