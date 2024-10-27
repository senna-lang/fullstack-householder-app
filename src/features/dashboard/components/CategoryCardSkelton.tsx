import { Card, CardContent, CardHeader } from "@/components/common/shadcn/card"
import { Skeleton } from "@/components/common/shadcn/skeleton"

export const CategoryCardSkeleton = () => {
  return (
    <Card className="w-full max-w-md bg-blue-400/30 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>
      <CardContent className="pt-4">
        <Skeleton className="h-4 w-full" />
        <div className="mt-2">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}
