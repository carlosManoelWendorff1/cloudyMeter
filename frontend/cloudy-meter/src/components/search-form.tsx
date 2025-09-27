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
      <SidebarGroup className="py-2">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>

          <SidebarInput
            id="search"
            placeholder="Pesquisar Medidores..."
            className="pl-10 rounded-xl border border-primary-200 bg-neutral-50 shadow-sm focus:border-primary-400 focus:ring-1 focus:ring-primary-300 transition"
            {...register("search")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSubmit({ search: getValues("search") });
              }
            }}
          />

          <Search className="pointer-events-none absolute top-1/2 left-3 w-5 h-5 -translate-y-1/2 text-primary-400 opacity-70 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
