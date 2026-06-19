import { Rating } from './Rating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils/helpers';

export const ReviewCard = ({ review }) => {
  const authorName = review?.userName || review?.user?.name || review?.user?.email || 'Anonymous';
  const initial = authorName.charAt(0).toUpperCase();
  const categories = review?.categories || review?.categoryRatings;
  const hasCategories = categories && typeof categories === 'object' && Object.keys(categories).length > 0;

  return (
    <Card className="border-slate-100">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">{initial}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">{authorName}</p>
                {review?.createdAt && (
                  <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                )}
              </div>
              <Rating rating={review?.rating || 0} size="sm" />
            </div>
            {review?.title && (
              <p className="font-medium text-sm text-gray-900">{review.title}</p>
            )}
            {review?.comment && (
              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
            )}
            {hasCategories && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {Object.entries(categories).map(([key, val]) => (
                  <span key={key} className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100">
                    {key}: {val}/5
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
