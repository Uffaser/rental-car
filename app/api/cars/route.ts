import { cookies } from "next/headers";
import { api } from "../api";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";
import { perPage } from "@/lib/api/clientApi";

export async function GET(request: NextRequest) {
  try {
    const brand = request.nextUrl.searchParams.get('brand')
    const price = Number(request.nextUrl.searchParams.get('price'))
    const minMileage = Number(request.nextUrl.searchParams.get('minMileage')) ?? 0
    const maxMileage = Number(request.nextUrl.searchParams.get('maxMileage')) ?? 0
    const page = Number(request.nextUrl.searchParams.get('page')) || 1

    const cookieStore = await cookies();

    const res = await api.get("/cars", {
      params: {
        perPage: perPage,
        page,
        ...(brand !== '' && { brand }),
        ...(price !== null && price !== 0 && { price: Number(price) }),
        minMileage: minMileage,
        ...(maxMileage !== null && maxMileage !== 0 && { maxMileage: Number(maxMileage) }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}