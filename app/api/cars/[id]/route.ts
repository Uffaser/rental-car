import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();

    const res = await api.get(`/cars/${params.id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, {
      status: res.status,
      headers: corsHeaders,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
          headers: corsHeaders,
        }
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}