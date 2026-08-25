import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export function Pagination({ page, hasNext, hasPrevious, onNext, onPrevious }: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-sm text-muted-foreground">Halaman {page + 1}</span>
      <Button variant="outline" size="sm" onClick={onPrevious} disabled={!hasPrevious}>
        <ChevronLeft className="mr-1 h-4 w-4" />
        Sebelumnya
      </Button>
      <Button variant="outline" size="sm" onClick={onNext} disabled={!hasNext}>
        Berikutnya
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}
