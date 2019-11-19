// @flow
// Kirobo Outbox icon

import React from 'react'

const path = (
  <>
    <path
      fill="none"
      stroke="#304054"
      strokeDasharray="1.5,3,0,0"
      strokeWidth="1.5"
      d="M2.934 14.5h10.601"
    />
    <path
      fill="none"
      stroke="#304054"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M11.866 5.427L8 1.561 4.134 5.427"
    />
    <path
      fill="none"
      stroke="#304054"
      strokeDasharray="1.5,3,0,0"
      strokeWidth="1.5"
      d="M8 1.561v10.674"
    />
  </>
)

export default ({ size, ...p }: { size: number }) => (
  <svg
    fillRule="evenodd"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="1.5"
    clipRule="evenodd"
    viewBox="0 0 16 16"
    height={size}
    width={size}
    {...p}
  >
    {path}
  </svg>
)
