import Swal from "sweetalert2"

export const showSwalSuccess = (title, text) => {
  Swal.fire({
    icon: 'success',
    title: title,
    text: text,
  })
}