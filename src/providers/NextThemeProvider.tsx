"use client"
import { ThemeProvider } from 'next-themes'
import React from 'react'

function NextThemeProvider({children}:{children:React.ReactNode}) {
  return (
   <ThemeProvider defaultTheme='system' attribute='class'>
{children}
   </ThemeProvider>
  )
}

export default NextThemeProvider