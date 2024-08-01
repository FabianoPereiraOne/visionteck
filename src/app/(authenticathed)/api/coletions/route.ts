import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { getAllColetions } from "@/services/prisma/coletions/getAll"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const token = new Headers(request.headers).get("Authorization")
  const isAuthorized = await useVerifyAdmin(token)

  if (!isAuthorized)
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: httpStatus.unAuthorized.error
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )

  try {
    const data = await getAllColetions()

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: httpStatus.ok.success
      },
      {
        status: httpStatus.ok.statusCode
      }
    )
  } catch (error) {
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}
