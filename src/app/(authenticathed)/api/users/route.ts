import { useGenerateHash } from "@/hooks/useGenerateHash"
import { userSchema } from "@/schemas/api/users"
import { createUser } from "@/services/prisma/users/create"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, phone, profession } = await request.json()
  const headers = new Headers(request.headers)
  const password = headers.get("password")

  const { success, data, error } = userSchema.safeParse({
    name,
    email,
    phone,
    profession,
    password
  })

  if (!success) {
    return NextResponse.json(
      { error: error.errors },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )
  }

  try {
    const user = {
      name,
      email,
      phone,
      profession,
      password: await useGenerateHash(password!)
    }

    const data = await createUser(user)
    return NextResponse.json(
      { data },
      {
        status: httpStatus.create.statusCode
      }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}
