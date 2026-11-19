"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import type {
  AdminHotelDetail,
  AdminHotelImage
} from "../domain/admin-hotel-detail";
import {
  createAdminHotel,
  updateAdminHotel
} from "../application/admin-hotel-actions";

const IMAGE_CATEGORIES = [
  "Rooms",
  "Restaurant",
  "Lobby",
  "Exterior",
  "Pool",
  "User"
];

/** Hotel content editor for the phase-2 parity fields. */
export function HotelEditor({
  initial,
  mediaAssets,
  mode = "edit"
}: {
  initial: AdminHotelDetail;
  mediaAssets: { id: string; altText: string; url: string }[];
  mode?: "create" | "edit";
}) {
  const t = useTranslations("adminHotelEditor");
  const router = useRouter();
  const messages = useMessageBox();
  const [form, setForm] = useState<AdminHotelDetail>(() => ({
    ...initial,
    translations: ["fa", "en", "ar"].map(
      (locale) =>
        initial.translations.find((translation) => translation.locale === locale) ?? {
          locale,
          name: "",
          description: "",
          policies: ""
        }
    )
  }));
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof AdminHotelDetail>(
    key: K,
    value: AdminHotelDetail[K]
  ) => setForm((current) => ({ ...current, [key]: value }));

  const setTranslation = (
    locale: string,
    key: "name" | "description" | "policies",
    value: string
  ) =>
    setForm((current) => {
      const exists = current.translations.some(
        (translation) => translation.locale === locale
      );
      return {
        ...current,
        translations: exists
          ? current.translations.map((translation) =>
              translation.locale === locale
                ? { ...translation, [key]: value }
                : translation
            )
          : [
              ...current.translations,
              {
                locale,
                name: key === "name" ? value : "",
                description: key === "description" ? value : null,
                policies: key === "policies" ? value : null
              }
            ]
      };
    });

  const setAmenity = <K extends keyof AdminHotelDetail["amenities"][number]>(
    index: number,
    key: K,
    value: AdminHotelDetail["amenities"][number][K]
  ) =>
    setForm((current) => ({
      ...current,
      amenities: current.amenities.map((amenity, amenityIndex) =>
        amenityIndex === index ? { ...amenity, [key]: value } : amenity
      )
    }));

  const setRoom = <K extends keyof AdminHotelDetail["rooms"][number]>(
    index: number,
    key: K,
    value: AdminHotelDetail["rooms"][number][K]
  ) =>
    setForm((current) => ({
      ...current,
      rooms: current.rooms.map((room, roomIndex) =>
        roomIndex === index ? { ...room, [key]: value } : room
      )
    }));

  const setImage = <K extends keyof AdminHotelImage>(
    index: number,
    key: K,
    value: AdminHotelImage[K]
  ) =>
    setForm((current) => ({
      ...current,
      images: current.images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, [key]: value } : image
      )
    }));

  const save = () => {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createAdminHotel(form)
          : await updateAdminHotel(form.hotelId, form);
      if (result.ok && result.data) {
        setForm({
          ...result.data,
          translations: ["fa", "en", "ar"].map(
            (locale) =>
              result.data!.translations.find(
                (translation) => translation.locale === locale
              ) ?? { locale, name: "", description: "", policies: "" }
          )
        });
        messages.toast({ kind: "success", message: t("saved") });
        if (mode === "create") {
          router.replace(`/admin/products/hotels/${result.data.hotelId}`);
        }
      } else {
        messages.toast({ kind: "error", message: t("error") });
      }
    });
  };

  const translations = ["fa", "en", "ar"].map((locale) => {
    const existing = form.translations.find(
      (translation) => translation.locale === locale
    );
    return (
      existing ?? {
        locale,
        name: "",
        description: "",
        policies: ""
      }
    );
  });

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="h5 mb-1">{form.translations[0]?.name || form.slug}</h2>
          <p className="fs-13 text-gray-6 mb-0" dir="ltr">
            /{form.slug}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={save}
          disabled={pending}
        >
          {pending ? t("saving") : t("save")}
        </button>
      </div>
      <div className="card-body">
        <h3 className="h6 mb-3">{t("basicTitle")}</h3>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="hotel-slug">
              {t("slug")}
            </label>
            <input
              id="hotel-slug"
              className="form-control"
              dir="ltr"
              value={form.slug}
              onChange={(event) => set("slug", event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="hotel-stars">
              {t("stars")}
            </label>
            <input
              id="hotel-stars"
              className="form-control"
              type="number"
              min={1}
              max={5}
              value={form.stars}
              onChange={(event) => set("stars", Number(event.target.value))}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="hotel-property-type">
              {t("propertyType")}
            </label>
            <select
              id="hotel-property-type"
              className="form-select"
              value={form.propertyType}
              onChange={(event) => set("propertyType", event.target.value)}
            >
              {["Hotel", "Resort", "Apartment", "Boutique", "Villa", "Hostel"].map(
                (item) => (
                  <option key={item} value={item}>
                    {t(`propertyType${item}`)}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="hotel-status">
              {t("status")}
            </label>
            <select
              id="hotel-status"
              className="form-select"
              value={form.status}
              onChange={(event) => set("status", event.target.value)}
            >
              {["Draft", "InReview", "Published", "Suspended", "Archived"].map(
                (item) => (
                  <option key={item} value={item}>
                    {t(`status${item}`)}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="hotel-destination">
              {t("destination")}
            </label>
            <input
              id="hotel-destination"
              className="form-control"
              dir="ltr"
              value={form.destinationId}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="hotel-address">
              {t("address")}
            </label>
            <input
              id="hotel-address"
              className="form-control"
              value={form.address ?? ""}
              onChange={(event) => set("address", event.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="hotel-lat">
              {t("latitude")}
            </label>
            <input
              id="hotel-lat"
              className="form-control"
              dir="ltr"
              value={form.latitude ?? ""}
              onChange={(event) =>
                set("latitude", event.target.value ? Number(event.target.value) : null)
              }
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="hotel-lng">
              {t("longitude")}
            </label>
            <input
              id="hotel-lng"
              className="form-control"
              dir="ltr"
              value={form.longitude ?? ""}
              onChange={(event) =>
                set("longitude", event.target.value ? Number(event.target.value) : null)
              }
            />
          </div>
        </div>

        <hr className="my-4" />
        <h3 className="h6 mb-3">{t("contactTitle")}</h3>
        <div className="row g-3">
          {[
            ["contactPhone", t("contactPhone")],
            ["websiteUrl", t("websiteUrl")],
            ["checkInTime", t("checkInTime")],
            ["checkOutTime", t("checkOutTime")]
          ].map(([key, label]) => (
            <div className="col-md-3" key={key}>
              <label className="form-label" htmlFor={`hotel-${key}`}>
                {label}
              </label>
              <input
                id={`hotel-${key}`}
                className="form-control"
                dir="ltr"
                value={String(form[key as keyof AdminHotelDetail] ?? "")}
                onChange={(event) =>
                  set(key as keyof AdminHotelDetail, event.target.value)
                }
              />
            </div>
          ))}
        </div>

        <hr className="my-4" />
        <h3 className="h6 mb-3">{t("seoTitle")}</h3>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="hotel-seo-title">
              {t("seoTitleLabel")}
            </label>
            <input
              id="hotel-seo-title"
              className="form-control"
              value={form.seoTitle ?? ""}
              onChange={(event) => set("seoTitle", event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="hotel-seo-description">
              {t("seoDescription")}
            </label>
            <textarea
              id="hotel-seo-description"
              className="form-control"
              rows={2}
              value={form.seoDescription ?? ""}
              onChange={(event) => set("seoDescription", event.target.value)}
            />
          </div>
        </div>

        <hr className="my-4" />
        <h3 className="h6 mb-3">{t("translationsTitle")}</h3>
        <div className="row g-3">
          {translations.map((translation) => (
            <div className="col-lg-4" key={translation.locale}>
              <div className="border rounded p-3 h-100">
                <strong className="d-block mb-2" dir="ltr">
                  {translation.locale}
                </strong>
                <label className="form-label" htmlFor={`hotel-name-${translation.locale}`}>
                  {t("name")}
                </label>
                <input
                  id={`hotel-name-${translation.locale}`}
                  className="form-control mb-2"
                  value={translation.name}
                  onChange={(event) =>
                    setTranslation(translation.locale, "name", event.target.value)
                  }
                />
                <label className="form-label" htmlFor={`hotel-description-${translation.locale}`}>
                  {t("description")}
                </label>
                <textarea
                  id={`hotel-description-${translation.locale}`}
                  className="form-control"
                  rows={3}
                  value={translation.description ?? ""}
                  onChange={(event) =>
                    setTranslation(
                      translation.locale,
                      "description",
                      event.target.value
                    )
                  }
                />
                <label className="form-label mt-2" htmlFor={`hotel-policies-${translation.locale}`}>
                  {t("policies")}
                </label>
                <textarea
                  id={`hotel-policies-${translation.locale}`}
                  className="form-control"
                  rows={2}
                  value={translation.policies ?? ""}
                  onChange={(event) =>
                    setTranslation(
                      translation.locale,
                      "policies",
                      event.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="h6 mb-1">{t("amenitiesTitle")}</h3>
            <p className="fs-12 text-gray-6 mb-0">{t("amenitiesHint")}</p>
          </div>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() =>
              set("amenities", [
                ...form.amenities,
                {
                  category: "General",
                  name: "",
                  code: "",
                  icon: null,
                  sortOrder: form.amenities.length
                }
              ])
            }
          >
            {t("addAmenity")}
          </button>
        </div>
        <div className="row g-2">
          {form.amenities.map((amenity, index) => (
            <div className="col-lg-6" key={`${amenity.code}-${index}`}>
              <div className="border rounded p-2">
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      className="form-control form-control-sm"
                      placeholder={t("category")}
                      value={amenity.category}
                      onChange={(event) =>
                        setAmenity(index, "category", event.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className="form-control form-control-sm"
                      placeholder={t("name")}
                      value={amenity.name}
                      onChange={(event) =>
                        setAmenity(index, "name", event.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      className="form-control form-control-sm"
                      dir="ltr"
                      placeholder={t("code")}
                      value={amenity.code ?? ""}
                      onChange={(event) =>
                        setAmenity(index, "code", event.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-1 d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-link text-danger p-0"
                      onClick={() =>
                        set(
                          "amenities",
                          form.amenities.filter((_, itemIndex) => itemIndex !== index)
                        )
                      }
                    >
                      ?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="h6 mb-1">{t("roomsEditorTitle")}</h3>
            <p className="fs-12 text-gray-6 mb-0">{t("roomsEditorHint")}</p>
          </div>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() =>
              set("rooms", [
                ...form.rooms,
                {
                  name: "",
                  roomType: "Double",
                  mealPlan: "BB",
                  adults: 2,
                  children: 0,
                  price: 0,
                  currency: "IRR",
                  description: "",
                  sortOrder: form.rooms.length,
                  inventory: 0,
                  maxOccupancy: 2,
                  roomSize: null,
                  bedType: null,
                  view: null,
                  ratePlan: null,
                  cancellationPolicy: null,
                  taxPercent: null,
                  stopSell: false
                }
              ])
            }
          >
            {t("addRoom")}
          </button>
        </div>
        <div className="d-flex flex-column gap-3">
          {form.rooms.map((room, index) => (
            <div className="border rounded p-3" key={`${room.name}-${index}`}>
              <div className="row g-2">
                <div className="col-md-3">
                  <label className="form-label fs-12">{t("name")}</label>
                  <input
                    className="form-control form-control-sm"
                    value={room.name}
                    onChange={(event) => setRoom(index, "name", event.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label fs-12">{t("roomType")}</label>
                  <input
                    className="form-control form-control-sm"
                    dir="ltr"
                    value={room.roomType}
                    onChange={(event) => setRoom(index, "roomType", event.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label fs-12">{t("mealPlan")}</label>
                  <input
                    className="form-control form-control-sm"
                    dir="ltr"
                    value={room.mealPlan}
                    onChange={(event) => setRoom(index, "mealPlan", event.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label fs-12">{t("price")}</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={room.price}
                    onChange={(event) => setRoom(index, "price", Number(event.target.value))}
                  />
                </div>
                <div className="col-md-1">
                  <label className="form-label fs-12">{t("currency")}</label>
                  <input
                    className="form-control form-control-sm"
                    dir="ltr"
                    value={room.currency}
                    onChange={(event) => setRoom(index, "currency", event.target.value)}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light btn-sm text-danger"
                    onClick={() =>
                      set(
                        "rooms",
                        form.rooms.filter((_, roomIndex) => roomIndex !== index)
                      )
                    }
                  >
                    {t("remove")}
                  </button>
                </div>
                {[
                  ["adults", t("adults"), "number"],
                  ["children", t("children"), "number"],
                  ["inventory", t("inventory"), "number"],
                  ["maxOccupancy", t("maxOccupancy"), "number"],
                  ["roomSize", t("roomSize"), "number"],
                  ["taxPercent", t("taxPercent"), "number"],
                  ["bedType", t("bedType"), "text"],
                  ["view", t("view"), "text"],
                  ["ratePlan", t("ratePlan"), "text"]
                ].map(([key, label, type]) => (
                  <div className="col-md-2" key={key}>
                    <label className="form-label fs-12">{label}</label>
                    <input
                      className="form-control form-control-sm"
                      dir={type === "text" ? "ltr" : undefined}
                      type={type}
                      value={String(room[key as keyof typeof room] ?? "")}
                      onChange={(event) => {
                        const raw = event.target.value;
                        const value =
                          type === "number" ? (raw ? Number(raw) : null) : raw;
                        setRoom(
                          index,
                          key as keyof typeof room,
                          value as never
                        );
                      }}
                    />
                  </div>
                ))}
                <div className="col-md-6">
                  <label className="form-label fs-12">{t("cancellationPolicy")}</label>
                  <input
                    className="form-control form-control-sm"
                    value={room.cancellationPolicy ?? ""}
                    onChange={(event) =>
                      setRoom(index, "cancellationPolicy", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`room-stop-${index}`}
                      checked={room.stopSell}
                      onChange={(event) =>
                        setRoom(index, "stopSell", event.target.checked)
                      }
                    />
                    <label className="form-check-label fs-12" htmlFor={`room-stop-${index}`}>
                      {t("stopSell")}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="h6 mb-1">{t("galleryTitle")}</h3>
            <p className="fs-12 text-gray-6 mb-0">{t("galleryHint")}</p>
          </div>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() =>
              set("images", [
                ...form.images,
                {
                  url: "",
                  caption: "",
                  sortOrder: form.images.length,
                  category: "Rooms",
                  altText: "",
                  isCover: form.images.length === 0,
                  source: "Hani",
                  mediaAssetId: null
                }
              ])
            }
          >
            {t("addImage")}
          </button>
        </div>
        <div className="row g-3">
          {form.images.map((image, index) => (
            <div className="col-lg-6" key={`${image.sortOrder}-${index}`}>
              <div className="border rounded p-3">
                <div className="row g-2">
                  <div className="col-12">
                    <label className="form-label">{t("imageUrl")}</label>
                    <input
                      className="form-control"
                      dir="ltr"
                      value={image.url}
                      onChange={(event) => setImage(index, "url", event.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">{t("altText")}</label>
                    <input
                      className="form-control"
                      value={image.altText ?? ""}
                      onChange={(event) => setImage(index, "altText", event.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">{t("category")}</label>
                    <select
                      className="form-select"
                      value={image.category ?? ""}
                      onChange={(event) => setImage(index, "category", event.target.value)}
                    >
                      <option value="">—</option>
                      {IMAGE_CATEGORIES.map((item) => (
                        <option key={item} value={item}>
                          {t(`imageCategory${item}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">{t("mediaAsset")}</label>
                    <select
                      className="form-select"
                      value={image.mediaAssetId ?? ""}
                      onChange={(event) => {
                        const media = mediaAssets.find(
                          (item) => item.id === event.target.value
                        );
                        setImage(index, "mediaAssetId", media?.id ?? null);
                        if (media) {
                          setImage(index, "url", media.url);
                          if (!image.altText) setImage(index, "altText", media.altText);
                        }
                      }}
                    >
                      <option value="">{t("noMediaAsset")}</option>
                      {mediaAssets.map((media) => (
                        <option key={media.id} value={media.id}>
                          {media.altText || media.id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`hotel-cover-${index}`}
                        checked={image.isCover}
                        onChange={(event) => {
                          setForm((current) => ({
                            ...current,
                            images: current.images.map((item, imageIndex) => ({
                              ...item,
                              isCover:
                                imageIndex === index ? event.target.checked : false
                            }))
                          }));
                        }}
                      />
                      <label className="form-check-label" htmlFor={`hotel-cover-${index}`}>
                        {t("cover")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-end justify-content-end">
                    <button
                      type="button"
                      className="btn btn-light btn-sm text-danger"
                      onClick={() =>
                        set(
                          "images",
                          form.images.filter((_, imageIndex) => imageIndex !== index)
                        )
                      }
                    >
                      {t("remove")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="alert alert-info mt-4 mb-0" role="status">
          {t("remainingHint", {
            amenities: form.amenities.length,
            rooms: form.rooms.length
          })}
        </div>
      </div>
    </div>
  );
}
