"use server";

interface PreorderPageParams {
  page: number;
  limit: number;
  sortBy: "date" | "name" | "pickupDate" | "createdDate";
  ascending: boolean;
  pickedUpStatus: "pickedUp" | "notPickedUp" | "all";
}

export default async function getPreorders(
  preorderPageParams: PreorderPageParams,
) {}
