import ProductCategoriesAdminContent from "@/components/admin/ProductCategoriesAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Categories | Admin Dashboard",
  description: "Manage product categories for import, export, and supply services.",
};

export default function ProductCategoriesPage() {
  return <ProductCategoriesAdminContent />;
}
