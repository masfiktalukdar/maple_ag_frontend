import CategoriesAdminContent from "@/components/admin/CategoriesAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories Management | Admin Dashboard",
  description: "Manage product categories for Maple AG Global LTD.",
};

export default function CategoriesAdminPage() {
  return <CategoriesAdminContent />;
}
