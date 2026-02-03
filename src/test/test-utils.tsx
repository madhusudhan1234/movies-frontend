import type { ReactElement, ReactNode } from 'react'
import { configure, render, type RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

interface AllProvidersProps {
  children: ReactNode
}

const AllProviders = ({children}: AllProvidersProps) => {
  return (
    <MantineProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </MantineProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {wrapper: AllProviders, ...options})

// Re-export everything from testing-library
export * from '@testing-library/react'

// Override the render method
export {customRender as render}

configure({testIdAttribute: 'data-id'});
