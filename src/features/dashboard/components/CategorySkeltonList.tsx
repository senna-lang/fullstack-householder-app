import { CategoryCardSkeleton } from "./CategoryCardSkelton"

const CategorySkeltonList = () => {
	return (
		<div className="flex gap-2 w-full">
			<CategoryCardSkeleton key="skeleton-1" />
			<CategoryCardSkeleton key="skeleton-2" />
			<CategoryCardSkeleton key="skeleton-3" />
			<CategoryCardSkeleton key="skeleton-4" />
			<CategoryCardSkeleton key="skeleton-5" />
		</div>
	)
}

export default CategorySkeltonList
