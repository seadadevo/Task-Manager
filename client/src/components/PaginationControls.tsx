import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IPaginationControlsProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControls = ({ page, totalPages, onPageChange }: IPaginationControlsProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 pt-2">
            <Button
                size="icon"
                variant="outline"
                className="rounded-xl h-8 w-8"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                <ChevronLeft size={15} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                    key={p}
                    size="sm"
                    variant={p === page ? "default" : "outline"}
                    className="rounded-xl h-8 w-8 text-xs"
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </Button>
            ))}

            <Button
                size="icon"
                variant="outline"
                className="rounded-xl h-8 w-8"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                <ChevronRight size={15} />
            </Button>
        </div>
    );
};

export default PaginationControls;
