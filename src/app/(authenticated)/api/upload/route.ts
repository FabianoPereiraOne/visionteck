import useClearString from "@/hooks/useClearString"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { visionBucket } from "@/services/firebase/config"
import { httpStatus } from "@/utils/httpStatus"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function POST(request: NextRequest) {
  const { clearString } = useClearString()
  const { isAdmin } = await useVerifyAdmin(request)
  if (!isAdmin) {
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: httpStatus.unAuthorized.error
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )
  }

  const data = await request?.formData()
  const file: File | null = data.get("file") as unknown as File

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      {
        statusCode: httpStatus.serverError.statusCode,
        error: "Falha ao processar arquivo enviado."
      },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }

  try {
    const timestamp = Date.now()
    const originalFileName = clearString(file?.name)
    const fileExtension = path.extname(originalFileName)
    const fileBaseName = path.basename(originalFileName, fileExtension)
    const newFileName = `${fileBaseName}-${timestamp}${fileExtension}`
    const nameRef = `/uploads/${newFileName}`

    const fileRef = ref(visionBucket, nameRef)
    const uploadTask = await uploadBytesResumable(fileRef, file)
    const uploadUrl = await getDownloadURL(uploadTask.ref)

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        success: "Upload realizado com sucesso.",
        path: uploadUrl
      },
      {
        status: httpStatus.ok.statusCode
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}
