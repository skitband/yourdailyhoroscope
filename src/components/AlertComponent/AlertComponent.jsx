import React from 'react'

const AlertComponent = ({message, alertType}) => {
  return (
    // <div className={`${alertType === "success" ? 'text-green-700' : 'text-red-700' } mt-2`}>{message}</div>
    <div
      className={`${alertType === "success" ? 'text-green-700' : 'text-red-700' } p-4 mx-10 mt-4 text-sm  rounded-lg bg-red-50`}
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>

  )
}

export default AlertComponent