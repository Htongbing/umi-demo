import React, { useState } from 'react'
import { GetDataComponentProps, Obj } from '@/const'
import { useGetLanguage } from '@/utils/hooks'
import '@/assets/js/udb.sdk.rsa.js'

function GetData(Component: (props: GetDataComponentProps) => React.ReactNode): React.ReactNode {
  return (props: Record<string, any>) => {
    const [isLoaded, data]: [boolean, Obj] = useGetLanguage()
    const [isVerify, setIsVerify] = useState<boolean>(false)

    const changeVerify: () => void = () => setIsVerify(true)

    return isLoaded ? Component({ ...props, isVerify, changeVerify, data }) : null
  }
}

export default GetData