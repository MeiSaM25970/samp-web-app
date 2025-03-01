import Swal from "sweetalert2";

export const fireError = (title: string, text: string) => {
  return Swal.fire({
    text,
    title,
    color: "#F04849",
    confirmButtonText: `باشه`,
    background: "#fff",
    width: 280,
    iconHtml: '<img src="/img/alertError.svg" width="40px" height="40px">',
  });
};
