export interface Doctor {
  id_doctor: number;
  nume: string;
  prenume: string;
  tip_doctor: string;
  cabinet: number;
  descriere: string;
  contact: string;
  recenzii: string;
  utilizatori_id_utilizator : number;
  cadre_medicale_id_cadru : number;
}
