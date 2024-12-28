'use client'

import React from 'react'
import { ErrorMessage } from '@/components/error-message'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          title="Algo salió mal"
          description={this.state.error?.message || 'Ha ocurrido un error inesperado'}
          actionText="Volver al inicio"
          actionHref="/"
        />
      )
    }

    return this.props.children
  }
}

