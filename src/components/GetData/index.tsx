import React, { useState } from 'react'
import { GetDataComponentProps } from '@/const'
import { useGetLanguage } from '@/utils/hooks'

function GetData(Component: (props: GetDataComponentProps) => React.ReactNode): React.ReactNode {
  return (props: Record<string, any>) => {
    const isLoaded: boolean = useGetLanguage()
    const [isVerify, setIsVerify] = useState<boolean>(false)

    const changeVerify: () => void = () => setIsVerify(true)

    return isLoaded ? Component({ ...props, isVerify, changeVerify }) : null
  }
}

export default GetData