import { useGenerateHash } from "@/hooks/useGenerateHash"
import { userSchema } from "@/schemas/api/users"
import transporter from "@/services/mail/config"
import { createUser } from "@/services/prisma/users/create"
import { httpStatus } from "@/utils/httpStatus"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, phone, profession } = await request.json()
  const headers = new Headers(request.headers)
  const password = headers.get("password")

  const { success, error } = userSchema.safeParse({
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

  const verificationToken = nanoid()

  try {
    const user = {
      name,
      email,
      phone,
      profession,
      verificationToken,
      password: await useGenerateHash(password!)
    }

    await createUser(user).catch(error => {
      return NextResponse.json(
        { error: error },
        {
          status: httpStatus.serverError.statusCode
        }
      )
    })

    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify?token=${verificationToken}`

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verificação de E-mail | Vision Teck",
      html: `Clique <a href="${verificationLink}">aqui</a> para verificar seu email.`
    })

    return NextResponse.json(
      {
        message: "Conta criada! Acesse seu email para confirmar sua conta."
      },
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

export async function PATCH(request: NextRequest) {
  const { name, email, phone, planID, profession, type, status } =
    await request.json()
}
