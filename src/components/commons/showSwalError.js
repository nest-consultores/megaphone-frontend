import Swal from "sweetalert2"

export const showSwalError = (title, text) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
  })
}