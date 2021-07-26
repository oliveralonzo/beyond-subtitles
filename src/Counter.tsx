// == External
import React, { FC } from 'react'
import { observer }  from 'mobx-react-lite'
import Button from 'react-bootstrap/Button'

// == App
import { useRootStore } from './store/RootStore'

export const Counter:FC = observer(() => {
  const store = useRootStore()

  return <>
    <Button onClick={() => store.countIncrement()}>Increment counter</Button>{' '}
    <Button onClick={() => store.countDecrement()}>Decrement counter</Button>{' '}
    <strong>{store.count}</strong>
  </>
})
