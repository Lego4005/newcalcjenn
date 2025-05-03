interface CircularProgressProps {
  value: number
  strokeWidth?: number
  showValueLabel?: boolean
  label?: string
  classNames?: {
    svg?: string
    indicator?: string
    track?: string
    value?: string
  }
}

export function CircularProgress({
  value,
  strokeWidth = 8,
  showValueLabel = false,
  label,
  classNames = {},
}: CircularProgressProps) {
  const circumference = 2 * Math.PI * 40 // radius is 40
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex">
      <svg
        className={classNames.svg || "w-20 h-20"}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          className={classNames.track || "stroke-default-300"}
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          className={classNames.indicator || "stroke-primary"}
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
      </svg>
      {showValueLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={classNames.value || "text-xl font-semibold"}>
            {value}%
          </span>
          {label && (
            <span className="text-tiny text-default-500">{label}</span>
          )}
        </div>
      )}
    </div>
  )
} 