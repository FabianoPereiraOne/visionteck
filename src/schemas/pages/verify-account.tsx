import BeatLoader from "react-spinners/BeatLoader"

export const defaultLoading = {
  message: "Aguarde um momento!\n Estamos ativando sua conta.",
  children: <BeatLoader color='#fff' size={20} />
}

export const defaultError = {
  message:
    "Não foi possível verificar sua conta no momento!\n Por favor, tente novamente mais tarde.",
  link: { name: "Voltar para home", url: "/" }
}

export const default404 = {
  message:
    "Erro 404! Parece que a página que você está procurando não está mais disponível ou nunca existiu.",
  link: { name: "Voltar para home", url: "/" }
}
