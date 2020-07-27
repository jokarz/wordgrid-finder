import React, { FC } from "react"

interface DirectionProps {
  direction: number
}

const Direction: FC<DirectionProps> = ({ direction = 0 }) => {
  switch (direction) {
    case 1:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(315deg)' }}></i>
      )
    case 2:
      return (
        <i className="fas fa-arrow-up"></i>
      )
    case 3:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(45deg)' }}></i>
      )
    case 4:
      return (
        <i className="fas fa-arrow-up fa-rotate-270"></i>
      )
    case 6:
      return (
        <i className="fas fa-arrow-up fa-rotate-90"></i>
      )
    case 7:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(225deg)' }}></i>
      )
    case 8:
      return (
        <i className="fas fa-arrow-up fa-rotate-180"></i>
      )
    case 9:
      return (
        <i className="fas fa-arrow-up" style={{ transform: 'rotate(135deg)' }}></i>
      )
    default:
      return (
        <i className="fas fa-question"></i>
      )

  }
}

export default Direction
