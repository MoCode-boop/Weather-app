import { ReactNode } from "react"

interface Props {
  children: ReactNode;
}

const Weather = ({ children }: Props) => {

  return (
    <div className="weatherbox">
      {children}
      </div>
    
  )
}

export default Weather;