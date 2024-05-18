import { TonConnectButton } from '@tonconnect/ui-react'
import './App.css'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect'
import { fromNano } from '@ton/core'
import WebApp from '@twa-dev/sdk'
import { MainButton } from '@twa-dev/sdk/react'

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

  const showAlert = () => {
    WebApp.showAlert('Hey there!')
  }

  return (
    <>
      <div>
        <div>
          <TonConnectButton />
        </div>
        <div>
          <div className='Card'>
            <b>{WebApp.platform}</b>
          </div>

          <div className='Card'>
            <b>Our contract Address</b>
            <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
            <b>Our contract Balance</b>
            <div className='Hint'>{fromNano(contract_balance)} TON</div>
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
        <a target="_blank" href="https://icons8.com/icon/48332/puzzle">Puzzle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
      <MainButton text="Submit" onClick={() => showAlert()} />
    </>
  )
}

export default App
