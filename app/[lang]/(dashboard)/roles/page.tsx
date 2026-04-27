import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { RolesContent } from "./roles-content";

const mockRoles = [
  {
    id: "1",
    name: "Super Admin",
    slug: "super-admin",
    permissions: 43,
    updatedAt: "Mar 14, 2026 14:30:09",
  },
  {
    id: "2",
    name: "Merchant",
    slug: "merchant",
    permissions: 17,
    updatedAt: "Mar 14, 2026 14:30:09",
  },
  {
    id: "3",
    name: "Organizer",
    slug: "organizer",
    permissions: 7,
    updatedAt: "Mar 14, 2026 14:30:09",
  },
  {
    id: "4",
    name: "Surveyor",
    slug: "surveyor",
    permissions: 5,
    updatedAt: "Mar 14, 2026 14:30:09",
  },
  {
    id: "5",
    name: "Admin Staff",
    slug: "admin-staff",
    permissions: 22,
    updatedAt: "Apr 13, 2026 21:59:50",
  },
  {
    id: "6",
    name: "Management",
    slug: "management",
    permissions: 7,
    updatedAt: "Apr 16, 2026 14:51:48",
  },
  {
    id: "7",
    name: "Finance",
    slug: "finance",
    permissions: 3,
    updatedAt: "Apr 16, 2026 15:17:06",
  },
];

export default async function RolesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return <RolesContent roles={mockRoles} dict={dict.roles} lang={lang} />;
}
