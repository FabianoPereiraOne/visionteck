import BeatLoader from "react-spinners/BeatLoader"

export const defaultLoading = {
 message: "Aguarde um momento!\n Estamos ativando sua conta.",
 children: <BeatLoader color="#fff" size={20} />
}

export const defaultError = {
 message: "Não foi possível verificar sua conta no momento!\n Por favor, tente novamente mais tarde.",
 link: { name: "Voltar para home", url: "/" }
}