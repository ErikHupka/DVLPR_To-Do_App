"use client"
import ToDoBoard from './components/ToDoBoard/ToDoBoard';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

export default function Home() {
  return (
  <>
    <QueryClientProvider client={queryClient}>
      <ToDoBoard />
    </QueryClientProvider>
  </>
  )
}
