import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";

type SearchFormValues = {
  search: string;
};

type SearchFormProps = React.ComponentProps<"form"> & {
  onSearchSubmit?: (value: string) => void;
};

export function SearchForm({ onSearchSubmit, ...props }: SearchFormProps) {
  const { register, handleSubmit, getValues } = useForm<SearchFormValues>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    onSearchSubmit?.(data.search);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>

          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            className="pl-8"
            {...register("search")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSubmit({ search: getValues("search") });
              }
            }}
          />

          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
