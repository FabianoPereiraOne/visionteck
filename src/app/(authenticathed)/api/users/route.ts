import { userBodySchema } from "@/schemas/api/users"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, phone, profession } = await request.json()

  const { success, error } = userBodySchema.safeParse({
    name,
    email,
    phone,
    profession
  })

  if (!success) {
    return NextResponse.json(
      { error: error.errors },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )
  }

  return NextResponse.json({ name, email, phone, profession })
}
