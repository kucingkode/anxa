export const GENDER_LABELS: Record<string, string> = {
  male: "Laki-laki",
  female: "Perempuan",
  other: "Lainnya",
  unknown: "Tidak diketahui",
};

export const ROLE_LABELS: Record<string, string> = {
  doctor: "Dokter",
  paramedic: "Paramedis",
  logistic_admin: "Admin Logistik",
  admin: "Admin",
};

export const QUEUE_STATUS_LABELS: Record<string, string> = {
  waiting: "Menunggu",
  "in-service": "Dilayani",
  done: "Selesai",
  cancelled: "Dibatalkan",
};

export const VISIT_STATUS_LABELS: Record<string, string> = {
  planned: "Terjadwal",
  arrived: "Tiba",
  triaged: "Triase",
  "in-progress": "Berlangsung",
  finished: "Selesai",
  cancelled: "Dibatalkan",
};

export const FOLLOW_UP_STATUS_LABELS: Record<string, string> = {
  booked: "Terjadwal",
  arrived: "Tiba",
  fulfilled: "Terpenuhi",
  cancelled: "Dibatalkan",
  noshow: "Tidak Hadir",
};

export const OBSERVATION_STATUS_LABELS: Record<string, string> = {
  preliminary: "Awal",
  final: "Final",
  amended: "Diubah",
  cancelled: "Dibatalkan",
  "entered-in-error": "Salah Input",
};
