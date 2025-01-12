import { useEffect, useState } from 'react'

import type { PaginationState } from '@tanstack/react-table'

export function useTablePagination({
  pageSize,
  page,
  onPageChange,
}: {
  pageSize: number
  page: number
  onPageChange?: (page: number) => void
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize,
  })

  useEffect(() => {
    setPagination((p) => ({
      ...p,
      pageIndex: page,
    }))
  }, [page])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onPageChange?.(pagination.pageIndex)
  }, [pagination])

  return { pagination, setPagination }
}
