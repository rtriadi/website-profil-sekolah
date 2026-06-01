"use server";

import { revalidatePath } from "next/cache";
import { saveContactInfo } from "@/lib/content/contact-service";
import type { OperatingHour } from "@/lib/content/schema";

export async function saveContactAction(
  prev: unknown,
  formData: FormData,
): Promise<{ fieldErrors?: Record<string, string>; error?: string; success?: boolean }> {
  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const email = formData.get("email") as string;
  const street = formData.get("street") as string;
  const village = formData.get("village") as string;
  const district = formData.get("district") as string;
  const city = formData.get("city") as string;
  const province = formData.get("province") as string;
  const postalCode = formData.get("postalCode") as string;
  const mapsEmbedUrl = formData.get("mapsEmbedUrl") as string;
  const instagram = formData.get("instagram") as string;
  const facebook = formData.get("facebook") as string;
  const youtube = formData.get("youtube") as string;
  const operatingHoursRaw = formData.get("operatingHours") as string;

  const errors: Record<string, string> = {};
  if (!phone?.trim()) errors.phone = "Nomor telepon harus diisi";
  if (!email?.trim()) errors.email = "Email harus diisi";
  if (!street?.trim()) errors.street = "Alamat harus diisi";
  if (!city?.trim()) errors.city = "Kota harus diisi";

  if (Object.keys(errors).length > 0) return { fieldErrors: errors };

  let operatingHours: OperatingHour[] = [];
  try {
    if (operatingHoursRaw) operatingHours = JSON.parse(operatingHoursRaw);
  } catch {
    return { error: "Data jam operasional tidak valid" };
  }

  saveContactInfo({
    address: {
      street: street.trim(),
      village: village?.trim() || "",
      district: district?.trim() || "",
      city: city.trim(),
      province: province?.trim() || "",
      postalCode: postalCode?.trim() || "",
    },
    phone: phone.trim(),
    whatsapp: whatsapp?.trim() || "",
    email: email.trim(),
    mapsEmbedUrl: mapsEmbedUrl?.trim() || "",
    operatingHours,
    socialMedia: {
      instagram: instagram?.trim() || undefined,
      facebook: facebook?.trim() || undefined,
      youtube: youtube?.trim() || undefined,
    },
  });

  revalidatePath("/kontak");
  revalidatePath("/admin/contact");
  revalidatePath("/");
  return { success: true };
}
