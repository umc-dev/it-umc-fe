export interface StrukturOrganisasi {
  image: string;
  description: string;
}

export interface StrukturOrganisasiResponse {
  data: StrukturOrganisasi | null;
  message?: string;
}
