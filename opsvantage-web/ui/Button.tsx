import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
  return (
    <button className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-700 via-emerald-500 to-yellow-400 text-white" {...props} />
  )
}
