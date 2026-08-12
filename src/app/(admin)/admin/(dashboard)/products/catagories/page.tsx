import { redirect } from "next/navigation";

export default function MisspelledCategoriesAdminPage() {
  redirect("/admin/products/categories");
}
