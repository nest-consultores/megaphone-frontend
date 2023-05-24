import Swal from "sweetalert2"

const showSwalSuccess = (text) => {
  Swal.fire({
    icon: 'success',
    title: text,
    timer: 1500
  })
}

export default showSwalSuccess