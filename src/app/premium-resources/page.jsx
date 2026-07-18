import React from 'react'

const PremiumResources = () => {
  return (
   <div className="relative flex flex-col items-center justify-center py-24 px-6 text-center rounded-2xl bg-background border-2 border-dashed border-amber-500/30 overflow-hidden">
  
  {/* Subtle Background Glow */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full"></div>
  
  {/* Animated Icon */}
  <div className="relative mb-6">
    {/* Ping animation for the background ring */}
    <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping"></div>
    {/* Solid center icon */}
    <div className="relative flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full border border-amber-500/30 shadow-lg shadow-amber-500/20">
      <span className="text-3xl">⏳</span>
    </div>
  </div>

  {/* Text Content */}
  <h3 className="relative z-10 text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600 mb-3">
    Premium Resources are Preparing
  </h3>
  
  <p className="relative z-10 text-sm md:text-base text-foreground/60 max-w-md mx-auto">
    We're currently curating high-quality, exclusive materials for this section. Check back soon for the update!
  </p>

</div>
  )
}

export default PremiumResources