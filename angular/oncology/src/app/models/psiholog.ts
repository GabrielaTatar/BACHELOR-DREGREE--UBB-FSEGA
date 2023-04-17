export interface Psiholog {
  id_psiholog: number;
  nume: string;
  prenume: string;
  cabinet: number;
  descriere: string;
  contact: string;
  recenzii: string;
  utilizatori_id_utilizator : number;
  cadre_medicale_id_cadru : number;
}
